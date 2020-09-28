import { ISong } from "@common/model/song";
import { IcecastIcestats } from '@common/types/icecast';
import { GeniusSongResponse } from '@common/types/genius';
import Axios from 'axios';
import * as mongoose from 'mongoose';
import { ISongDoc } from "../model/song";

const schedule = require('node-schedule');

const Song = mongoose.model<ISongDoc>('song');

interface NowPlayingProps {
    icecastStatusUrl: string
    geniusApiKey: string
}

export class NowPlaying {

    private currentSongData: ISong | null;

    private interval = 10000;

    private songLogExpiry = 2592000000;  //delete songs older than this (default: 1 month)

    //used for checking if song has updated for Icecast fetch
    private currentSongTitle: string = "";

    constructor(private props: NowPlayingProps){}

    //fetch icecast data
    public fetchCurrentSong = async () => {

        const { icecastStatusUrl } = this.props;
        
        try{

            const response = await Axios.get(icecastStatusUrl)

            var trackName = (response.data.icestats as IcecastIcestats).source.title;

            if(trackName != this.currentSongTitle){

                var parts = trackName.split(' - ');
                var artist = parts.shift();
                var title = parts.join(' - '); //in case song title contains " - ", will rejoin the string

                this.currentSongTitle = trackName;

                this.updateCurrentSong({
                    artist : artist,
                    title : title
                });
            }

        }catch(err){

            console.error("nowplaying err: " + err.message);

        }

    }

    //push update song
    private updateCurrentSong = async (songData: any) => {
        
        return new Promise((resolve, reject) => {

            var newSong = this.addSongToLog(songData);

            this.currentSongData = newSong;

            this.getSongData(songData.artist, songData.title);

            resolve(newSong);

        });
    }

    private addSongToLog = async (songData: ISong) => {

        //console.log('"' + songName + '" by "' + artist + '"');
        var timeStamp = Date.now();

        var newSong = new Song({
            artist : songData.artist,
            title : songData.title,
            album : songData.album,
            commercial : songData.commercial,
            length : songData.length,
            timestamp : timeStamp
        });

        newSong.save();

        return newSong;
    }

    private filterGeniusResults = (results: any[]) =>{
        //Check results to make sure we get the most accurate one
        return results[0].result;
    }

    private getSongData = async (artist: string, songName: string) => {

        var searchString = escape(artist + " " + songName);

        const geniusUrl = `https://api.genius.com/search?q=${searchString}`,
        const headers = {
                'Authorization' : "Bearer " + this.props.geniusApiKey
            }

        const response = await Axios.get(geniusUrl, { headers, }) as GeniusSongResponse;

        this.currentSongData = {raw : {artist : artist, title : songName}};
        // this.currentSongData.genius = filterGeniusResults(data.response.hits) || {};

    }

    public cleanDatabase(){
       
        var timeInMs = Date.now();

        var ageThreshold = timeInMs - this.songLogExpiry; //timestamp over 

        var ageThresholdDate = new Date(ageThreshold);

        console.log('songlog: cleanup - deleting songs played before ' + ageThresholdDate.toISOString());

        try{

            const result = await Song.remove({timestamp: {'$lte' : ageThresholdDate }}).exec();
            console.log("songlog: removed " +  result.n + " old records");

        } catch(err){
            console.error(err);
        }

    }

    this.currentTrackInfo = function(){
        return currentSongData;
    }

    this.getRecentSongs = function(limit = 0, skip =  0){
        return new Promise((resolve, reject) => {
            Song.find().sort({timestamp : -1}).limit(limit).skip(skip).exec((err, docs) => {
                if(err) reject(err);
                else resolve(docs);
            });
        });
    }

    this.getNumberOfLoggedSongs = function(){
        return new Promise((resolve, reject) => {
            Song.count({}, (err, count) => {
                if(err) reject(err);
                resolve({
                    count: count
                });
            });
        });
    }

    this.getSongsByArtist = function(artist, limit = 0, skip = 0){
        return new Promise((resolve, reject) => {
            Song.find({artist : artist}).sort({timestamp : -1}).limit(limit).skip(skip).exec((err, docs) => {
                if(err) reject(err);
                else resolve(docs);
            });
        });
    }

    this.getSongsByTitle = function(title, limit = 0, skip = 0){
        return new Promise((resolve, reject) => {
            Song.find({title : title}).sort({timestamp : -1}).limit(limit).skip(skip).exec((err, docs) => {
                if(err) reject(err);
                else resolve(docs);
            });
        });
    }

    this.getSongsByArtistAndTitle = function(artist, title, limit = 0, skip = 0){
        return new Promise((resolve, reject) => {
            Song.find({artist : artist, title : title}).sort({timestamp : -1}).limit(limit).skip(skip).exec((err, docs) => {
                if(err) reject(err);
                else resolve(docs);
            });
        });
    }

    if(config.ice_status){
        fetchCurrentSong();
        var songGetInterval = setInterval(fetchCurrentSong, interval);
    }

    cleanDatabase();
    var cleanupSchedule = schedule.scheduleJob('0 0 0 * * *', cleanDatabase);


}

module.exports = NowPlaying;