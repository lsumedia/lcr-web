const http = require('http');
const express = require('express');
const fs = require('fs');
const JSONC = require('json-comments');
const multer = require('multer');
const request = require('request');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

/* Load server config */
var configString;

try{
    configString = fs.readFileSync('./config.json','utf8');
}catch(e){
    console.log("config: Error reading config file, using defaults");
    configString = fs.readFileSync('./config.sample.json','utf8');
}

const config = JSONC.parse(configString);

/* Initialisation */

var app = express();

app.use(session({
    secret : 'adaifjdpmoaufaiomdpuxcvbnmqyydunuapo',
    resave: true,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended : false}));

var server = http.createServer(app);

/* Models */

var ShowModel = require('./model/show.js');
var EpisodeModel = require('./model/episode.js');
var TokenModel = require('./model/token.js');
var SongModel = require('./model/song.js');
var UserModel = require('./model/user.js');

//Functions for managing stuff
var TokenTools = require('./includes/tokentools.js');
var Authentication = require('./includes/authentication.js');
var NowPlaying = new(require('./includes/nowplaying.js'))(config);
var CurrentShow = new(require('./includes/currentshow.js'))(NowPlaying);

var Controllers = { NowPlaying, CurrentShow };

/* Authentication */

app.post('/startsession', passport.authenticate('local', { 
        successRedirect : '/dashboard',
        failureRedirect: '/login',
        failureFlash : true
    }),
    function(req, res){
        res.send("auth succeeeded");
    }
);

var UserAuth = (config.authenticate)? passport.authenticate('local', {failureRedirect : '/login'}) : (req, res, next) => { next(); };
//var authfn = (req, res, next) => { next(); };


/* Routes */

//Disable cache
app.use(function(req, res, next){
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); 
    res.setHeader("Pragma", "no-cache"); 
    res.setHeader("Expires", 0);
    next();
});

//Static folders

app.use('/dashboard', UserAuth , express.static('dashboard/build')); //Dashboard
app.use('/', express.static('player/build')); //Public page

//REST API

var privateAPI = new (require('./route/private.js'))(app, UserAuth);      //Private (CMS)
var publicAPI = new (require('./route/public.js'))(app, Controllers);   //Public (Homepage)
var utilityAPI = new (require('./route/utility.js'))(app, TokenTools.tokenMiddleware, Controllers);  //Utility (Studio interface)

//Anything else just goes to homepage (enables the HTML5 page paths) - This must go last!
app.use('/*', function(req, res){
res.sendFile(__dirname + '/player/build/index.html');
});

/* Start Database and Server */

var dbUrl = `mongodb://${config.db_host}:${config.db_port}/${config.db_name}`;

mongoose.connect(dbUrl).then(
    () => { console.log("mongoose: Connected successfully to server")},
    err => { console.log("mongoose: Error connecting to database"); console.log(err)}
)

if(Number.isInteger(config.port)){
    
    server.listen(config.port, function () {
      console.log('server: listening on port ' + config.port);
    });
  
}
