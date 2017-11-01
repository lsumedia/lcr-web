
const request = require('request');

function NowPlaying (db, config){

    var currentSongTitle = "";

    var currentSongData = {};

    const interval = 30000;

    const col = db.collection('playedsongs');

    function getCurrentSong(){
        request.get(config.ice_status, function(error, response, body){
            try{
                var statusJSON = JSON.parse(body);
                var track = statusJSON.icestats.source.title;

                if(track != currentSongTitle){

                    var parts = track.split(' - ');
                    var artist = parts.shift();
                    var songName = parts.join(' - ');

                    currentSongTitle = track;
                    addSongToLog(artist, songName);
                    getSongData(artist, songName);
                }
            }catch(err){
                console.log("nowplaying err: " + err.message);
            }
            
        });
    }

    function addSongToLog(artist, songName){
        //console.log('"' + songName + '" by "' + artist + '"');
        col.insertOne({
            artist : artist,
            title : songName,
            timestamp : Date.now()
        });
    }

    function getSongData(artist, songName){
        var url = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${config.last_fm_key}&artist=${artist}&track=${songName}&format=json`;
        request.get(url, function(error, response, body){
            if(error) console.log(error.message);
            try{
                var data = JSON.parse(body);
                currentSongData = data.track || {};
                currentSongData.raw = {artist : artist, title : songName};
            }catch(e){
                console.log(e.message);
            }
        });
    }

    this.currentTrackInfo = function(){
        return currentSongData;
    }

    this.getRecentSongs = function(limit = 0, skip =  0){
        return new Promise((resolve, reject) => {
            col.find({}).sort({timestamp : -1}).limit(limit).skip(skip).toArray((err, docs) => {
                if(err) reject(err);
                else resolve(docs);
            });
        });
    }

    this.getSongsByArtist = function(artist, limit = 0, skip = 0){
        return new Promise((resolve, reject) => {
            col.find({artist : artist}).sort({timestamp : -1}).limit(limit).skip(skip).toArray((err, docs) => {
                if(err) reject(err);
                else resolve(docs);
            });
        });
    }

    this.getSongsByTitle = function(title, limit = 0, skip = 0){
        return new Promise((resolve, reject) => {
            col.find({title : title}).sort({timestamp : -1}).limit(limit).skip(skip).toArray((err, docs) => {
                if(err) reject(err);
                else resolve(docs);
            });
        });
    }

    this.getSongsByArtistAndTitle = function(artist, title, limit = 0, skip = 0){
        return new Promise((resolve, reject) => {
            col.find({artist : artist, title : title}).sort({timestamp : -1}).limit(limit).skip(skip).toArray((err, docs) => {
                if(err) reject(err);
                else resolve(docs);
            });
        });
    }

    getCurrentSong();
    var songGetInterval = setInterval(getCurrentSong, interval);


}

module.exports = NowPlaying;