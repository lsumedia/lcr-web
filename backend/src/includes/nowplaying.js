const mongoose = require('mongoose');
const request = require('request');
const schedule = require('node-schedule');

const Song = mongoose.model('song');

function NowPlaying (config){

    var _this = this;

    var currentSongData = {};

    var interval = 10000;

    var songLogExpiry = 2592000000;  //delete songs older than this (default: 1 month)

    //used for checking if song has updated for Icecast fetch
    var currentSongTitle = "";

    //fetch icecast data
    function fetchCurrentSong(){
        request.get(config.ice_status, function(error, response, body){
            try{
                var statusJSON = JSON.parse(body);
                var track = statusJSON.icestats.source.title;

                if(track != currentSongTitle){

                    var parts = track.split(' - ');
                    var artist = parts.shift();
                    var title = parts.join(' - '); //in case song title contains " - ", will rejoin the string

                    currentSongTitle = track;

                    _this.updateCurrentSong({
                        artist : artist,
                        title : title
                    });
                }
            }catch(err){
                console.log("nowplaying err: " + err.message);
                //console.log(err);
            }
            
        });
    }

    //push update song
    this.updateCurrentSong = function(songData){
        
        return new Promise((resolve, reject) => {

            var newSong = addSongToLog(songData);

            currentSongData = newSong;

            getSongData(songData.artist, songData.title);

            resolve(newSong);

        });
    }

    function addSongToLog(songData){
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

    function filterGeniusResults(results){
        //Check results to make sure we get the most accurate one
        return results[0].result;
    }

    function getSongData(artist, songName){
        var searchString = escape(artist + " " + songName);

        var reqOptions = {
            url : `https://api.genius.com/search?q=${searchString}`,
            headers : {
                'Authorization' : "Bearer " + config.genius_api_key
            }
        }

        request.get(reqOptions, function(error, response, body){
            if(error) console.log(error.message);
            try{
                currentSongData = {raw : {artist : artist, title : songName}};
                var data = JSON.parse(body);
                currentSongData.genius = filterGeniusResults(data.response.hits) || {};
            }catch(e){
                console.log(e.message);
            }
        });
    }

    function cleanDatabase(){
       
        var timeInMs = Date.now();

        var ageThreshold = timeInMs - songLogExpiry; //timestamp over 

        var ageThresholdDate = new Date(ageThreshold);

        console.log('songlog: cleanup - deleting songs played before ' + ageThresholdDate.toISOString());

        Song.remove({timestamp: {$lte : ageThreshold }}, function(err, result){
            if(err) console.log("songlog: " + err.message)
            else console.log("songlog: removed " +  result.n + " old records");
        });

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