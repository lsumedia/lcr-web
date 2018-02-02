const request = require('request');

/**
 * 
 * The API that services any public requests - used by the public webapp & some parts of the CMS
 * 
 * @param {*} app - Express app 
 * @param {*} db  - MongoDB database object
 * @param {*} Shows 
 * @param {*} Episodes 
 * @param {*} NowPlaying 
 * @param {*} CurrentShow 
 */
function PublicAPI(app, db, Shows, Episodes, NowPlaying, CurrentShow){


    app.get('/api/public/show', function(req, res){

        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;

        Shows.getShowsAll(limit, skip).then(function(shows){
                res.send(shows);
            },function(){
                res.status(404).send('Not found');
            });
    });
    
    app.get('/api/public/show/:slug', function(req, res){
        Shows.getShowBySlug(req.params.slug).then(function(show){
            res.send(show);
        },function(){
            res.status(404).send('Not found');
        });
    });

    app.get('/api/public/episode/byshow/:showSlug', function(req,res){
        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;
        var showSlug = req.params.showSlug;
        
        Episodes.getByShow(showSlug, limit, skip).then(function(episodes){
                res.send(episodes);
            },function(){
                res.status(404).send('Not found');
            });
    });

    app.get('/api/public/episode', function(req, res){
        
        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;
        
        Episodes.getAll(limit, skip).then(function(episodes){
                res.send(episodes);
            },function(){
                res.status(404).send('Not found');
            });
    });

    app.get('/api/public/episodetypes', function(req, res){
        Episodes.getEpisodeTypes().then(function(types){
                res.send(types);
            }, function(){
                res.status(500).send("Error, where there should never be an error. Something has gone badly wrong");
            });
    });

    app.get('/api/public/episode/:id', function(req, res){
        Episodes.getById(req.params.id).then(function(show){
            res.send(show);
        },function(){
            res.status(404).send('Not found');
        });
    });

    /* CURRENT SHOW DATA */

    app.get('/api/public/currentshow', function(req,res){
        CurrentShow.getCurrentShow().then(
             function(currentShow){
                 res.send(currentShow);
             },
             function(){
                 res.status(500).send();
             }
        )
     });

    /* RAW TRACK DATA */

    app.get('/api/public/nowplaying', function(req,res){
        request('http://ice.lsu.co.uk:8080/status-json.xsl').pipe(res);
    });

    app.get('/api/public/songs/now', function(req,res){
        res.send(NowPlaying.currentTrackInfo());
    });

    app.get('/api/public/songs/recent', function(req,res){

        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;

        NowPlaying.getRecentSongs(limit, skip).then(function(docs){
            res.send(docs);
        },function(err){
            console.log(err);
            res.status(404).send('Not found');
        });
    });

    app.get('/api/public/songs/count', function(req, res){
        NowPlaying.getNumberOfLoggedSongs().then(function(count){
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

        NowPlaying.getSongsByArtist(artist, limit, skip).then(function(docs){
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

        NowPlaying.getSongsByArtistAndTitle(artist, title, limit, skip).then(function(docs){
            res.send(docs);
        },function(err){
            console.log(err);
            res.status(404).send('Not found');
        });
    });
}

module.exports = PublicAPI;