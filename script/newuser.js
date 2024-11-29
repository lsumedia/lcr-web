const readlineSync = require('readline-sync');
const mongoose = require('mongoose');
const JSONC = require('json-comments');
const fs = require('fs');

const User = require('../model/user.js');

var configString = fs.readFileSync('../config.json','utf8');

const config = JSONC.parse(configString);

var dbUrl = `mongodb://${config.db_username}:${config.db_password}@${config.db_host}:${config.db_port}/${config.db_name}?authSource=admin`;

mongoose.connect(dbUrl).then(
    () => { 
        console.log("mongoose: Connected successfully to server")
        makeNewUser();
    },
    err => { console.log("mongoose: Error connecting to database"); console.log(err)}
);

function makeNewUser(){

    console.log("New User Script");

    var email = readlineSync.question("Enter a valid email address:");

    var password1 = readlineSync.question("Enter password:", { hideEchoBack : true });
    var password2 = readlineSync.question("Confirm password:", { hideEchoBack : true });

    if(password1 != password2){ 
        console.log("Passwords do not match");
        makeNewUser(); 
    }

    var newUser = new User({ email });

    newUser.setPassword(password1);

    newUser.save(function(err){
        if(err){ 
            console.log("Error creating new user: "  + err.message); 
            makeNewUser();
        }
        else{
            console.log("Created new user with email " + email)
            process.exit();
        } 
    });

}