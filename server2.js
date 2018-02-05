const http = require('http');
const express = require('express');
const fs = require('fs');
const JSONC = require('json-comments');
const multer = require('multer');
const request = require('request');

const passport = require('passport');

const mongoose = require('mongoose');

/* INITIALISATION */

var app = express();

var server = http.createServer(app);


/* Load server config */
var configString;

try{
    configString = fs.readFileSync('./config.json','utf8');
}catch(e){
    console.log("config: Error reading config file, using defaults");
    configString = fs.readFileSync('./config.sample.json','utf8');
}

const config = JSONC.parse(configString);

/* Models */


var ShowModel = require('./model/show.js');
var EpisodeModel = require('./model/episode.js');
var TokenModel = require('./model/token.js');
//var SongModel = require('./model/song.js');


//Functions for managing stuff
var TokenTools = require('./includes/tokentools.js');
//var NowPlaying = new(require('./includes/nowplaying.js'))(db, config);
//var CurrentShow = new(require('./includes/currentshow.js'))(Shows, NowPlaying);


/* Authentication */

//var authfn = (config.authenticate)? passport.authenticate('local', {failureRedirect : '/login'}) : (req, res, next) => { next(); };
var authfn = (req, res, next) => { next(); };

/* Routes */

//Disable cache
app.use(function(req, res, next){
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); 
    res.setHeader("Pragma", "no-cache"); 
    res.setHeader("Expires", 0);
    next();
});

//Static folders

app.use('/dashboard', authfn , express.static('dashboard/build')); //Dashboard
app.use('/', express.static('player/build')); //Public page

//REST API

var privateAPI = new (require('./route/PrivateAPI.js'))(app, authfn);

//Public API

//var publicAPI = new (require('./route/PublicAPI.js'))(app, db, Controllers);

//Utility API

//var utilityAPI = new (require('./route/UtilityAPI.js'))(app, db, TokenTools.tokenMiddleware, Controllers);

//Anything else just goes to homepage (enables the HTML5 page paths)
//THIS MUST GO LAST!
app.use('/*', function(req, res){
res.sendFile(__dirname + '/player/build/index.html');
});
  

/* Start Database and Server */

var dbUrl = `mongodb://${config.db_host}:${config.db_port}/${config.db_name}`;

mongoose.connect(dbUrl).then(
    () => { console.log("mongoose: Connected successfully to server")},
    err => { console.log("mongoose: Error connecting to database"); console.log(err)}
)

if(Number.isInteger(config.port) == true){
    
    server.listen(config.port, function () {
      console.log('server: listening on port ' + config.port);
    });
  
}
