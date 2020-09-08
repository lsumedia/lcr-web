
import * as http from 'http';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
const cookieSession = require('cookie-session');
const flash = require('express-flash');
import * as WebSocket from 'websocket';

/* Models */

import { ShowModel } from './model/show';
import { EpisodeModel } from './model/episode'
import { TokenModel } from './model/token';
import { SongModel } from './model/song';
import { UserModel } from './model/user';
import { ScheduleSlotModel } from './model/scheduleslot';

import { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE } from '@common/constants/database';

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

const httpServer = http.createServer(app);

/* WebSocket */

const wsServer = new WebSocket.server({
    httpServer,
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

var UserAuth = (process.env.SKIP_AUTH)?  (_req: Express.Request, _res: Express.Response, next: any) => { next(); } : Authentication.userMiddleware;

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

var dbUrl =  `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017/${MONGO_DATABASE}`;

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
    
httpServer.listen(port, function () {
    console.log('server: listening on port ' + port);
});
