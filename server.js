
const http = require('http');
const express = require('express');
const fs = require('fs');
const JSONC = require('json-comments');
const multer = require('multer');
const request = require('request');

const passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var MongoClient = require('mongodb').MongoClient;

/* INITIALISATION */

/* Load server config */
var configString;

try{
    configString = fs.readFileSync('./config.json','utf8');
}catch(e){
    console.log("config: Error reading config file, using defaults");
    configString = fs.readFileSync('./config.sample.json','utf8');
}

var config = JSONC.parse(configString);

var app = express();

var server = http.createServer(app);

/* DATABASE */

var dbUrl = `mongodb://${config.db_host}:${config.db_port}/${config.db_name}`;

MongoClient.connect(dbUrl, function(err, db){

  if(err){
    console.log('mongodb: ' + err.message); return;
  }
    console.log("mongodb: Connected to server");

/* PASSPORT AUTHENTICATION  */

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

//Enable authentication if it's on (ie. not dev mode)
var authfn = (config.authenticate)? passport.authenticate('facebook') : (req, res, next) => { next(); };

/* CONTROLLERS */

var Tokens = new(require('./controllers/Token.js'))(db);
var Shows = new (require('./controllers/Show.js'))(db);
var Episodes = new (require('./controllers/Episode.js'))(db, Shows);
var NowPlaying = new(require('./controllers/NowPlaying.js'))(db, config);
var CurrentShow = new(require('./controllers/CurrentShow.js'))(db, Shows, NowPlaying);

/* ROUTES */

//Static hosts

app.use('/dashboard', authfn , express.static('dashboard/build')); //Dashboard
app.use('/', express.static('player/build')); //Public page

//REST API

var privateAPI = new (require('./includes/PrivateAPI.js'))(app, db, authfn, Shows, Episodes, NowPlaying, CurrentShow);

//Public API

var publicAPI = new (require('./includes/PublicAPI.js'))(app, db, Shows, Episodes, NowPlaying, CurrentShow);

//Utility API

var utilityAPI = new (require('./includes/UtilityAPI.js'))(app, db, Tokens.authenticateToken(), Shows, Episodes, NowPlaying, CurrentShow);


/* START SERVER */

if(Number.isInteger(config.port) == true){
    
  server.listen(config.port, function () {
    console.log('server: listening on port ' + config.port);
  });

}

    
});