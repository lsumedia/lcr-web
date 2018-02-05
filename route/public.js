const mongoose = require('mongoose');
const request = require('request');

const Episode = mongoose.model('episode');
const Show = mongoose.model('show');

const Token = mongoose.model('token');
const TokenTools = require('../includes/tokentools.js');

/**
 * 
 * The API that services any public requests - used by the public webapp & some parts of the CMS

 */
function PublicAPI(app, Controllers){

    
    app.get('/api/public/show', function(req, res){

        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;

        Show.find({}).limit(limit).skip(skip).exec(function(err,docs){
            if(err) res.status(500).send(err);
            else res.send(docs);
        });
    });
    
    app.get('/api/public/show/:slug', function(req, res){
        Show.findOne({slug : req.params.slug}).exec(function(err,doc){
            if(err) res.status(500).send(err);
            else if(!doc) res.status(404).send("Not Found");
            else res.send(doc);
        });
    });

    app.get('/api/public/episode/byshow/:showSlug', function(req,res){
        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;
        var showSlug = req.params.showSlug;
        
        Episode.find({showSlug : showSlug}).limit(limit).skip(skip).exec(function(err,docs){
            if(err) res.status(500).send(err);
            else res.send(docs);
        });
    });

    app.get('/api/public/episode', function(req, res){
        
        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;

        Episode.find({public : true}).limit(limit).skip(skip).exec(function(err,docs){
            if(err) res.status(500).send(err);
            else res.send(docs);
        });
    });

    app.get('/api/public/episode/:id', function(req, res){

        Episode.findById(req.params.id).exec(function(err,doc){
            if(err) res.status(500).send(err);
            else if(!doc || !doc.public) res.status(404).send("Not Found");
            else {
                doc.getMetaData(function(err, meta){
                    doc.set({meta : meta});
                    if(err) res.status(404).send("Could not fetch metadata for episode");
                    else res.send(doc);
                });
            }
        });
    });

    /* CURRENT SHOW DATA */

    app.get('/api/public/currentshow', function(req,res){
        Controllers.CurrentShow.getCurrentShow().then(
             function(currentShow){
                 res.send(currentShow);
             },
             function(){
                 res.status(500).send();
             }
        );
     });

    /* RAW TRACK DATA */

    app.get('/api/public/songs/now', function(req,res){
        res.send(Controllers.NowPlaying.currentTrackInfo());
    });

    app.get('/api/public/songs/recent', function(req,res){

        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;

        Controllers.NowPlaying.getRecentSongs(limit, skip).then(function(docs){
            res.send(docs);
        },function(err){
            console.log(err);
            res.status(404).send('Not found');
        });
    });

    app.get('/api/public/songs/count', function(req, res){
        Controllers.NowPlaying.getNumberOfLoggedSongs().then(function(count){
            res.send(count);
        },function(err){
            console.log(err);
            res.status(404).send('Not found');
        });
    });

    app.get('/api/public/songs/artist/:artist', function(req,res){

        var artist = req.params.artist;

        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;

        Controllers.NowPlaying.getSongsByArtist(artist, limit, skip).then(function(docs){
            res.send(docs);
        },function(err){
            console.log(err);
            res.status(404).send('Not found');
        });
    });

    app.get('/api/public/songs/title/:artist/:title', function(req, res){
        
        var artist = req.params.artist;
        var title = req.params.title;

        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;

        Controllers.NowPlaying.getSongsByArtistAndTitle(artist, title, limit, skip).then(function(docs){
            res.send(docs);
        },function(err){
            console.log(err);
            res.status(404).send('Not found');
        });
    });
}

module.exports = PublicAPI;