
var express = require('express');

function PrivateApi(app, db, auth, Shows){
   
    app.get('/api/private/show/', auth, function(req, res){
        Shows.getShowsAll().then(function(shows){
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


    /* Folder Size */


}

module.exports = PrivateApi;