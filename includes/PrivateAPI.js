
var express = require('express');

function PrivateApi(app, db, auth, Shows, Episodes){
   

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

        var title = req.body.title;
        var description = req.body.description;
        var tags = req.body.tags;
        var image = req.body.image;
        
        Shows.insert(title, description, tags, image).then(function(show){
            res.send(show);
        },function(err){
            res.status(400).send(err);
        });

    });

    app.post('/api/private/show/:slug', auth, express.json(), function(req, res){
        var slug = req.params.slug;

        var title = req.body.title;
        var description = req.body.description;
        var tags = req.body.tags;
        var image = req.body.image;
        
       Shows.update(slug, title, description, tags, image).then(function(show){
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
        Episodes.getBySlug(req.params.id).then(function(show){
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


}

module.exports = PrivateApi;