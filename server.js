
const http = require('http');
const express = require('express');
const fs = require('fs');
const JSONC = require('json-comments');
const multer = require('multer');
const request = require('request');

const passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var MongoClient = require('mongodb').MongoClient;

/* Load server config */
var configString;

try{
    configString = fs.readFileSync('./config.json','utf8');
}catch(e){
    console.log("config: Error reading config file, using defaults");
    configString = fs.readFileSync('./config.sample.json','utf8');
}

var config = JSONC.parse(configString);


/* Init server */

var app = express();

var server = http.createServer(app);

/* Connect to database */

var dbUrl = `mongodb://${config.db_host}:${config.db_port}/${config.db_name}`;

MongoClient.connect(dbUrl, function(err, db){

  if(err){
    console.log('mongodb: ' + err.message); return;
  }
    console.log("mongodb: Connected to server");

/* Passport authentication */

passport.use('facebook', new FacebookStrategy({
  clientID: config.facebook_app_id,
  clientSecret: config.facebook_app_secret,
  callbackURL: config.login_redirect
},
function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login.html' }),
  function(req, res) {
    res.redirect('/dashboard');
});

//this is wrong. blatantly wrong.
var authfn = (config.authenticate)? passport.authenticate('facebook') : (req, res, next) => { next(); };

/* Controllers */

const ShowController = require('./controllers/Show.js');
const EpisodeController = require('./controllers/Episode.js');

var Shows = new ShowController(db);

var NowPlaying = new(require('./controllers/NowPlaying.js'))(db, config);


//Static hosts

app.use('/dashboard', authfn , express.static('dashboard/build')); //Dashboard
app.use('/', express.static('player/build')); //Public page

//REST API

var privateAPI = new (require('./includes/PrivateAPI.js'))(app, db, authfn, Shows);

//Public API

var publicAPI = new (require('./includes/PublicAPI.js'))(app, db, Shows, NowPlaying);



/* START SERVER */

if(Number.isInteger(config.port) == true){
    
      server.listen(config.port, function () {
        console.log('server: listening on port ' + config.port);
      });
    
    }

    
});