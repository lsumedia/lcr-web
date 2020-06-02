const http = require('http');
const express = require('express');
const fs = require('fs');
const JSONC = require('json-comments');
const multer = require('multer');
const request = require('request');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const flash = require('express-flash');
const WebSocketServer = require('websocket').server;

/* Models */

import { CommentModel, IComment } from '../../common/src/model/comment';

var ShowModel = require('../../common/dist/model/show.js');
var EpisodeModel = require('../../common/dist/model/episode.js');
var TokenModel = require('../../common/dist/model/token.js');
var SongModel = require('../../common/dist/model/song.js');
var UserModel = require('../../common/dist/model/user.js');
var ScheduleSlotModel = require('../../common/dist/model/scheduleslot.js');


var port = process.env.PORT || 3050;

/* Initialisation */

var app = express();

app.use(cookieSession({
    name : 'session',
    keys : [process.env.SECRET],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(flash());
app.use(express.urlencoded({extended : false}));
app.use(passport.initialize());
app.use(passport.session());

var server = http.createServer(app);

/* WebSocket */

var wsServer = new WebSocketServer({
    httpServer : server,
    autoAcceptConnections : false
});


//Functions for managing stuff
var TokenTools = require('./includes/tokentools.js');
var Authentication = require('./includes/authentication.js');
var NowPlaying = new(require('./includes/nowplaying.js'));
var CurrentShow = new(require('./includes/currentshow.js'))(NowPlaying);
var StudioSwitcher = new(require('./includes/studioswitcher.js'))();

var Controllers = { NowPlaying, CurrentShow, StudioSwitcher };

/* Authentication */

app.post('/startsession', Authentication.startSessionMiddleware,
    function(req, res){
        res.redirect('/dashboard');
    }
);

app.get('/endsession', Authentication.endSessionMiddleware);

app.get('/sessiondata', Authentication.sessionData);

var UserAuth = (config.authenticate)? Authentication.userMiddleware : (req, res, next) => { next(); };

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

var privateAPI = new (require('./route/private.js'))(app, UserAuth, Controllers);      //Private (CMS)
var publicAPI = new (require('./route/public.js'))(app, Controllers);   //Public (Homepage)
var utilityAPI = new (require('./route/utility.js'))(app, TokenTools.tokenMiddleware, Controllers);  //Utility (Studio interface)

//Anything else just goes to homepage (enables the HTML5 page paths) - This must go last!
app.use('/*', function(req, res){
    res.sendFile(__dirname + '/player/build/index.html');
});

/* Start Database and Server */

var dbUrl;

if(config.db_username){
    dbUrl = `mongodb://${config.db_username}:${config.db_password}@${config.db_host}:${config.db_port}/${config.db_name}`;
} else {
    dbUrl = `mongodb://${config.db_host}:${config.db_port}/${config.db_name}`;
}

mongoose.connect(dbUrl).then(
    () => { 
        console.log("mongoose: Connected successfully to server")
    },
    err => { 
        console.log("mongoose: Error connecting to database"); 
        console.log(err)
        process.exit();
    }
)
    
server.listen(port, function () {
    console.log('server: listening on port ' + port);
});
