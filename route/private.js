const mongoose = require('mongoose');
const express = require('express');

const Episode = mongoose.model('episode');
const Show = mongoose.model('show');

const Token = mongoose.model('token');
const TokenTools = require('../includes/tokentools.js');

function PrivateApi(app, auth){
   
    var opts = { runValidators : true, new : true};

    /* Shows */

    //List all shows
    app.get('/api/private/show/', auth, function(req, res){

        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;

        Show.find({}, null, { sort : { slug : 1 }}).limit(limit).skip(skip).exec(function(err,docs){
            if(err) res.status(500).send(err);
            else res.send(docs);
        });
    });
    
    //Get one show
    app.get('/api/private/show/:slug', auth, function(req, res){
        
        Show.findOne({slug : req.params.slug}).exec(function(err,doc){
            if(err) res.status(500).send(err);
            else if(!doc) res.status(404).send("Not Found");
            else res.send(doc);
        });

    });

    //Add a show
    app.post('/api/private/show/', auth, express.json(), function(req, res){

        var newShow = new Show(req.body);

        newShow.save(function(err){
            if(err) res.status(400).send(err);
            else res.send(newShow);
        });

    });

    //Update a show
    app.post('/api/private/show/:slug', auth, express.json(), function(req, res){
        var slug = req.params.slug;
        
        Show.update({ slug : slug }, req.body, opts, function(err, raw){
            if(err) res.status(404).send(err);
            else res.send(raw);
        });

    });

    //Delete a show
    app.delete('/api/private/show/:slug', auth, express.json(), function(req, res){
        var slug = req.params.slug;

        Show.findOneAndRemove({slug : slug}, function(err, doc){
            if(err) res.status(404).send(err.message);
            else res.send(doc);
        });

    });

    /* Episodes */

    //List all episodes
    app.get('/api/private/episode', auth, function(req, res){

        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;

        Episode.find({}, null, { sort : { $natural : -1 }}).limit(limit).skip(skip).exec(function(err,docs){
            if(err) res.status(500).send(err);
            else res.send(docs);
        });
    });
    
    //Get a specific episode (WITHOUT grabbing metadata)
    app.get('/api/private/episode/:id', auth, function(req, res){

        Episode.findById(req.params.id).exec(function(err,doc){
            if(err) res.status(500).send(err);
            else if(!doc) res.status(404).send("Not Found");
            else res.send(doc);
        });

    });

    //Add new episode
    app.post('/api/private/episode/', auth, express.json(), function(req, res){

        var newEpisode = new Episode(req.body);

        newEpisode.save(function(err){
            if(err) res.status(400).send(err);
            else res.send(newEpisode);
        });
    });

    //Update an episode
    app.post('/api/private/episode/:id', auth, express.json(), function(req, res){

        Episode.findByIdAndUpdate(req.params.id, req.body, opts, function(err, raw){
            if(err) res.status(404).send(err);
            else res.send(raw);
        });
    });

    //Delete an episode
    app.delete('/api/private/episode/:id', auth, express.json(), function(req, res){

        Episode.findByIdAndRemove(req.params.id, function(err, doc){
            if(err) res.status(404).send(err.message);
            else res.send(doc);
        });

    });

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
            else if(!doc) res.status(404).send("Not Found");
            else res.send(doc);
        });
    });

    /* Users */

}

module.exports = PrivateApi;