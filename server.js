
const http = require('http');
const express = require('express');
const fs = require('fs');
const JSONC = require('json-comments');
const multer = require('multer');

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

/* Connect to database */

var dbUrl = `mongodb://${config.db_host}:${config.db_port}/${config.db_name}`;

MongoClient.connect(dbUrl, function(err, db){
    console.log("mongo: Connected to server");
});

/* Passport authentication */

passport.use('facebook', new FacebookStrategy({
  clientID: config.facebook_app_id,
  clientSecret: config.facebook_app_secret,
  callbackURL: config.login_redirect
},
function(accessToken, refreshToken, profile, cb) {
  return cb(err, null);
  /* User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user); 
  }); */
}
));

/* Init server */

var app = express();

var server = http.createServer(app);

app.use(passport.initialize());
app.use(passport.session());

//Static hosts

app.use(express.static('public')); //Public page
app.use('/dashboard', passport.authenticate('facebook'), express.static('dashboard/build')); //Dashboard

//REST API


//Public API


if(Number.isInteger(config.port) == true){
    
      /* Start server */
      server.listen(config.port, function () {
        console.log('Listening on port ' + config.port);
      });
    
    }