const fs = require('fs');
const mongoose = require('mongoose');

const Episode = mongoose.model('episode');
const Show = mongoose.model('show');

//Make sure the backup folder exists
var backupDir = './backups';

if(!fs.existsSync(backupDir)){
    fs.mkdirSync(backupDir);
}

function generateFilename(type){
    var nowdate = new Date();
    var re = /:/g;
    var dateString = nowdate.toISOString().replace(re, '-');

    return backupDir + '/' + type + '_' + dateString + '.json';
}

function grabEpisodes(callback){
    Episode.find().exec(function(err,docs){
        var backupName = generateFilename('episode');
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
        var backupName = generateFilename('show');
        var jsonstring = JSON.stringify(docs, null, 4);

        fs.writeFile(backupName, jsonstring, 'utf8', (err) => {
            if(err) console.log(err);
            else console.log("backup: Created show local backup " + backupName);
        });

        callback(err,docs);
    });
}

function restoreEpisodes(restoreFile, callback){
    try{
        
        if(!Array.isArray(restoreFile)) throw("backup: Restore file must contain an array");

        Episode.remove({}, function(err){
            var count = 0;
            restoreFile.forEach(function(doc){
                count++;
                var restoreEpisode = new Episode(doc);
                restoreEpisode.save();
            });
            console.log("backup: restoring " + count + " files from backup");
            callback(null, restoreFile);
        });

    }catch(err){
        console.log(err);
        callback(err, null);
    }
}

function restoreShows(restoreFile, callback){
    try{
        
        if(!Array.isArray(restoreFile)) throw("backup: Restore file must contain an array");

        Show.remove({}, function(err){
            var count = 0;
            restoreFile.forEach(function(doc){
                count++;
                var restoreEpisode = new Show(doc);
                restoreEpisode.save();
            });
            console.log("backup: restoring " + count + " files from backup");
            callback(null, restoreFile);
        });

    }catch(err){
        console.log(err);
        callback(err, null);
    }
}

module.exports = {
    backupEpisodes : function(callback){
        grabEpisodes(callback);
    },
    backupShows : function(callback){
       grabShows(callback);
    },
    restoreEpisodes : function(restoreFile, callback){
        //Perform a local backup before restoring
        grabEpisodes(function(err, docs){
            restoreEpisodes(restoreFile, callback);
        });
    },
    restoreShows : function(restoreFile, callback){
        //Perform a local backup before restoring
        grabShows(function(err, docs){
            restoreShows(restoreFile, callback);
        });
    },
    downloadFilename : function(type){
        var nowdate = new Date();
        var re = /:/g;
        var dateString = nowdate.toISOString().replace(re, '-');
    
        return type + '_' + dateString + '.json';
    }
}