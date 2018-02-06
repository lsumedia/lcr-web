const readlineSync = require('readline-sync');
const mongoose = require('mongoose');
const JSONC = require('json-comments');
const fs = require('fs');

const User = require('../model/user.js');

var configString = fs.readFileSync('../config.json','utf8');

const config = JSONC.parse(configString);

var dbUrl = `mongodb://${config.db_host}:${config.db_port}/${config.db_name}`;

mongoose.connect(dbUrl).then(
    () => { console.log("mongoose: Connected successfully to server")},
    err => { console.log("mongoose: Error connecting to database"); console.log(err)}
);

console.log("New User Script");

var email = readlineSync.question("Enter a valid email address:");

var password = readlineSync.question("Enter password:", { hideEchoBack : true });

var newUser = new User({ email });

newUser.setPassword(password);

newUser.save(function(err){
    if(err) console.log("Error creating new user: "  + err.message);
    else console.log("Created new user with email " + email);
    process.exit();
});