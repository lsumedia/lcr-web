const readline = require('readline');
const mongoose = require('mongoose');
const JSONC = require('json-comments');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const User = require('../model/user.js');

var configString = fs.readFileSync('../config.json','utf8');

const config = JSONC.parse(configString);

var dbUrl = `mongodb://${config.db_host}:${config.db_port}/${config.db_name}`;


console.log("Create New User");

function makeUser(){
    rl.question("Enter a valid email address:", (email) => {
        rl.question("Enter a password:", (password1) => {
            rl.question("Confirm password:", (password2) => {
                if(password1 == password2){

                    var newUser = new User({ email });

                    newUser.setPassword(password1);

                    newUser.save(function(err){
                        if(err){  
                            console.log("Error creating new user: "  + err);
                            makeUser();
                        }else console.log("Created new user with email " + email);
                        process.exit();
                    });
                }else{
                    console.log("Passwords do not match");
                    makeUser();
                }
            });
        });
    });
}


mongoose.connect(dbUrl).then(
    () => { 
        console.log("mongoose: Connected successfully to server");
        makeUser();
    },
    err => { console.log("mongoose: Error connecting to database"); console.log(err)}
);