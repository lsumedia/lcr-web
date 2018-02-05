const mongoose = require('mongoose');
const express = require('express');

const Token = mongoose.model('token');
const TokenTools = require('../includes/tokentools.js');

function PrivateApi(app, auth){
   

    /* Shows *//*

    app.get('/api/private/show/', auth, function(req, res){

        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;

        Controllers.Shows.getShowsAll(limit, skip).then(function(shows){
                res.send(shows);
            },function(){
                res.status(404).send('Not found');
            });
    });
    
    app.get('/api/private/show/:slug', auth, function(req, res){
        Controllers.Shows.getShowBySlug(req.params.slug).then(function(show){
            res.send(show);
        },function(){
            res.status(404).send('Not found');
        });
    });

    app.post('/api/private/show/', auth, express.json(), function(req, res){
        
        Controllers.Shows.insert(req.body).then(function(show){
            res.send(show);
        },function(err){
            console.log(err);
            res.status(400).send(err);
        });

    });

    app.post('/api/private/show/:slug', auth, express.json(), function(req, res){
        var slug = req.params.slug;
        
        Controllers.Shows.update(slug, req.body).then(function(show){
            res.send(show);
        },function(err){
            res.status(404).send(err);
        });

    });

    app.delete('/api/private/show/:slug', auth, express.json(), function(req, res){

        Controllers.Shows.delete(req.params.slug).then(function(show){
            res.status(200).send("Deleted show " + req.params.slug);
        },function(err){
            res.status(404).send(err);
        });

    });

    /* Episodes *//*

    app.get('/api/private/episode', auth, function(req, res){

        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;
        
        Controllers.Episodes.getAll(limit, skip).then(function(episodes){
                res.send(episodes);
            },function(){
                res.status(404).send('Not found');
            });
    });
    
    app.get('/api/private/episode/:id', auth, function(req, res){
        Controllers.Episodes.getById(req.params.id).then(function(show){
            res.send(show);
        },function(){
            res.status(404).send('Not found');
        });
    });

    app.post('/api/private/episode/', auth, express.json(), function(req, res){

        Controllers.Episodes.insert(req.body).then(function(episode){
                res.send(episode);
            },function(err){
                res.status(400).send(err);
            });

    });

    app.post('/api/private/episode/:id', auth, express.json(), function(req, res){
        var id = req.params.id;

        Controllers.Episodes.update(id, req.body).then(function(show){
                res.send(show);
            },function(err){
                res.status(404).send(err);
            });

    });

    app.delete('/api/private/episode/:id', auth, express.json(), function(req, res){

        Controllers.Episodes.delete(req.params.id).then(function(show){
            res.status(200).send("Deleted episode " + req.params.id);
        },function(err){
            res.status(404).send(err);
        });

    });


    /* Folder Size */

    /* Tokens */

    //Create token
    app.post('/api/private/token', auth, function(req,res){
        TokenTools.generate(function(err, token){
            if(err) res.status(500).send(err.message);
            else res.status(200).send(token);
        });
    });

    app.delete('/api/private/token/:id', auth, function(req,res){
        Token.findByIdAndRemove(req.params.id, function(err, doc){
            if(err) res.status(404).send(err.message);
            else res.send(doc);
        });
    });

    //List of tokens (provides only id & creation time/expiry)
    app.get('/api/private/token/', auth, function(req, res){

        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;

        Token.find({}, '_id createdAt').limit(limit).skip(skip).exec(function(err,docs){
            if(err) res.status(500).send(err.message);
            else res.send(docs);

        });
    });

    //Get individual token (including secret)
    app.get('/api/private/token/:id', auth, function(req, res){
        Token.findById(req.params.id).exec(function(err,doc){
            if(err) res.status(500).send(err.message);
            else res.send(doc);
        });
    });

}

module.exports = PrivateApi;