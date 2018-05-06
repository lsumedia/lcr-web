const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const fs = require('fs');

var upload = multer({dest : 'uploads/'});

const Episode = mongoose.model('episode');
const Show = mongoose.model('show');

const Token = mongoose.model('token');
const TokenTools = require('../includes/tokentools.js');

const BackupTools = require('../includes/backup.js');

function PrivateApi(app, auth, Controllers){
   
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

    //Get episodes by show
    app.get('/api/private/episode/byshow/:showSlug', auth, function(req,res){
        var limit = parseInt(req.query.limit) || 0;
        var skip = parseInt(req.query.skip) || 0;
        var showSlug = req.params.showSlug;
        
        Episode.find({showSlug : showSlug}, null, { sort : { $natural : -1 }}).limit(limit).skip(skip).exec(function(err,docs){
            if(err) res.status(500).send(err);
            else res.send(docs);
        });
    });

    //Search episodes with a string

    app.get('/api/private/episode/search/:term', auth, function(req,res){

        var re = new RegExp(req.params.term, 'i');

        Episode.find().or([{'title' : {$regex : re}},{'descrip[tion' : {$regex : re}},{'tags' : {$regex : re}}]).sort({'title':1}).exec(function(err,docs){
            if(err) res.status(400).send(err);
            else res.send(docs);
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

    //Get number of episodes
    app.get('/api/private/episode/count', auth, function(req, res){

        Episode.count({}).exec(function(err,count){
            if(err) res.status(500).send(err);
            else res.send({
                count : count
            });
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

    //Change password

    //Update bio & email preferences

    //Delete user

    //Create user

    /* Backup & Restore */

    //Backup Episodes

    app.get('/api/private/backup/episode', auth, function(req,res){
       
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-disposition','attachment; filename=' + BackupTools.downloadFilename('episodes'));
        BackupTools.backupEpisodes(function(err, docs){
            if(err) res.status(500).send(err.message);
            else res.send(JSON.stringify(docs,null,4));
        })
    });

    //Restore Episodes

    app.post('/api/private/backup/episode', auth, upload.single('episodes'), function(req, res){

        fs.readFile(req.file.path, function(err, data){
            var json = JSON.parse(data);
            BackupTools.restoreEpisodes(json, function(err, data){
                if(err) res.send(err);
                else res.redirect('/dashboard/#/backup');
            });
        });
    });

    //Backup Shows 
    
    app.get('/api/private/backup/show', auth, function(req,res){

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-disposition','attachment; filename=' + BackupTools.downloadFilename('shows'));
        BackupTools.backupShows(function(err, docs){
            if(err) res.status(500).send(err.message);
            else res.send(JSON.stringify(docs,null,4));
        })
    });

    //Restore Shows
    app.post('/api/private/backup/show', auth, upload.single('shows'), function(req, res){

        fs.readFile(req.file.path, function(err, data){
            var json = JSON.parse(data);
            BackupTools.restoreShows(json, function(err, data){
                if(err) res.send(err);
                else res.redirect('/dashboard/#/backup');
            });
        });
    });
}

module.exports = PrivateApi;