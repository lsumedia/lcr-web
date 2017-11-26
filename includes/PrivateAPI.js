
var express = require('express');

function PrivateApi(app, db, auth, Shows, Episodes, NowPlaying, CurrentShow, Tokens){
   

    /* Shows */

    app.get('/api/private/show/', auth, function(req, res){

        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;

        Shows.getShowsAll(limit, skip).then(function(shows){
                res.send(shows);
            },function(){
                res.status(404).send('Not found');
            });
    });
    
    app.get('/api/private/show/:slug', auth, function(req, res){
        Shows.getShowBySlug(req.params.slug).then(function(show){
            res.send(show);
        },function(){
            res.status(404).send('Not found');
        });
    });

    app.post('/api/private/show/', auth, express.json(), function(req, res){
        
        Shows.insert(req.body).then(function(show){
            res.send(show);
        },function(err){
            console.log(err);
            res.status(400).send(err);
        });

    });

    app.post('/api/private/show/:slug', auth, express.json(), function(req, res){
        var slug = req.params.slug;
        
       Shows.update(slug, req.body).then(function(show){
            res.send(show);
        },function(err){
            res.status(404).send(err);
        });

    });

    app.delete('/api/private/show/:slug', auth, express.json(), function(req, res){

        Shows.delete(req.params.slug).then(function(show){
            res.status(200).send("Deleted show " + req.params.slug);
        },function(err){
            res.status(404).send(err);
        });

    });

    /* Episodes */

    app.get('/api/private/episode', auth, function(req, res){

        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;
        
        Episodes.getAll(limit, skip).then(function(episodes){
                res.send(episodes);
            },function(){
                res.status(404).send('Not found');
            });
    });
    
    app.get('/api/private/episode/:id', auth, function(req, res){
        Episodes.getById(req.params.id).then(function(show){
            res.send(show);
        },function(){
            res.status(404).send('Not found');
        });
    });

    app.post('/api/private/episode/', auth, express.json(), function(req, res){

        Episodes.insert(req.body).then(function(episode){
                res.send(episode);
            },function(err){
                res.status(400).send(err);
            });

    });

    app.post('/api/private/episode/:id', auth, express.json(), function(req, res){
        var id = req.params.id;

        Episodes.update(id, req.body).then(function(show){
                res.send(show);
            },function(err){
                res.status(404).send(err);
            });

    });

    app.delete('/api/private/episode/:id', auth, express.json(), function(req, res){

        Episodes.delete(req.params.id).then(function(show){
            res.status(200).send("Deleted episode " + req.params.id);
        },function(err){
            res.status(404).send(err);
        });

    });


    /* Folder Size */

    /* Tokens */

    //Create token
    app.post('/api/private/token', auth, function(req,res){
        Tokens.generate().then(function(token){
            res.status(200).send(token);
        }, function(err){
            res.status(500).send(err.message);
        })
    });

    app.delete('/api/private/token/:id', auth, function(req,res){
        Tokens.delete().then(function(response){
            res.send(response);
        }, function(err){
            res.status(404).send(err.message);
        })
    });

    //List of tokens (provides only id & creation time/expiry)
    app.get('/api/private/token/', auth, function(req, res){

        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;

        Tokens.getAll(limit, skip).then(function(docs){
            res.send(docs);
        },function(err){
            res.status(500).send(err.message);
        });
    });

    //Get individual token (including secret)
    app.get('/api/private/token/:id', auth, function(req, res){
        Tokens.getSecret(req.params.id).then(function(doc){
            res.send(doc);
        }, function(err){
            res.status(404).send("Not found");
        });
    });

}

module.exports = PrivateApi;