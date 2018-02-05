const mongoose = require('mongoose');
const express = require('express');

const Episode = mongoose.model('episode');

function UtilityAPI(app, auth){

    var opts = { runValidators : true, new : true};
   
    /* this'll have to wait...
    app.get('/api/utility/currentshow', auth, function(req,res){
       Controllers.CurrentShow.getCurrentShow().then(
            function(currentShow){
                res.send(currentShow);
            },
            function(){
                res.status(500).send();
            }
       )
    });

    app.post('/api/utility/currentshow', auth, express.json(), function(req, res){
        Controllers.CurrentShow.setCurrentShow(req.body).then(function(currentShow){
            res.send(currentShow);
        }, function(err){
            res.status(500).send();
        });
    });

    app.delete('/api/utility/currentshow', auth, function(req,res){
        Controllers.CurrentShow.clearCurrentShow().then(function(currentShow){
            res.send(currentShow);
        }, function(err){
            res.status(500).send();
        });
    });*/


    /* Episodes */

    //Add episode
    app.post('/api/utility/episode/', auth, express.json(), function(req, res){

        console.log("utility: request to add episode");

        var newEpisode = new Episode(req.body);

        newEpisode.save(function(err){
            if(err) res.status(400).send(err);
            else res.send(newEpisode);
        });
    });

    //Update an episode
    app.post('/api/utility/episode/:id', auth, express.json(), function(req, res){

        Episode.findByIdAndUpdate(req.params.id, req.body, opts, function(err, raw){
            if(err) res.status(404).send(err);
            else res.send(raw);
        });
    });

     //Delete an episode
     app.delete('/api/utility/episode/:id', auth, express.json(), function(req, res){

        Episode.findByIdAndRemove(req.params.id, function(err, doc){
            if(err) res.status(404).send(err.message);
            else res.send(doc);
        });

    });
}

module.exports = UtilityAPI;