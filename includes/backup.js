const fs = require('fs');
const mongoose = require('mongoose');

const Episode = mongoose.model('episode');
const Show = mongoose.model('show');

//Make sure the backup folder exists
var backupDir = './backups';

if(!fs.existsSync(backupDir)){
    fs.mkdirSync(backupDir);
}

function generateFileName(type){
    var nowdate = new Date();
    var re = /:/g;
    var dateString = nowdate.toISOString().replace(re, '-');

    return backupDir + '/' + type + '_' + dateString + '.json';
}

function grabEpisodes(callback){
    Episode.find().exec(function(err,docs){
        var backupName = generateFileName('episode');
        var jsonstring = JSON.stringify(docs, null, 4);

        fs.writeFile(backupName, jsonstring, 'utf8', (err) => {
            if(err) console.log(err);
            else console.log("backup: Created episode local backup " + backupName);
        });

        callback(err,docs);
    });
}

function grabShows(callback){
    Show.find().exec(function(err,docs){
        var backupName = generateFileName('show');
        var jsonstring = JSON.stringify(docs, null, 4);

        fs.writeFile(backupName, jsonstring, 'utf8', (err) => {
            if(err) console.log(err);
            else console.log("backup: Created show local backup " + backupName);
        });

        callback(err,docs);
    });
}

module.exports = {
    backupEpisodes : function(callback){
        grabEpisodes(callback);
    },
    backupShows : function(callback){
       grabShows(callback);
    },
    restoreEpisodes : function(){
        grabEpisode();
    },
    restoreShows : function(){
        grabShows();
    }
}