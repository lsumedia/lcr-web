const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('user');

passport.use(new LocalStrategy(
    function(email, password, done){
        console.log("attempting to authenticate: " + email + ":" + password);
        User.findOne({ email : email}, function(err, user){
            if (err) { return done(err);}
            if (!user) {
                console.log("bad username");
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                console.log("bad password");
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log("success?");
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    console.log("serialize");
    done(null, user.email);
});

passport.deserializeUser(function(email, done) {
    User.find({email : email}, function(err, user) {
        done(err, user);
    });
});

module.exports = {};