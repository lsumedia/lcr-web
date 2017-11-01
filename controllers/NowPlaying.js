
const request = require('request');

function NowPlaying (db, config){

    var currentSongTitle = "";

    var currentSongData = {};

    const interval = 30000;

    function getCurrentSong(){
        request.get(config.ice_status, function(error, response, body){
            try{
                var statusJSON = JSON.parse(body);
                var track = statusJSON.icestats.source.title;

                if(track != currentSongTitle){

                    var parts = track.split('-');
                    var artist = parts.shift();
                    var songName = parts.join('-');

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
        console.log('"' + songName + '" by "' + artist + '"');
    }

    function getSongData(artist, songName){

    }

    this.currentTrackInfo = function(){
        
    }

    getCurrentSong();
    var songGetInterval = setInterval(getCurrentSong, interval);


}

module.exports = NowPlaying;