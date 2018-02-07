const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('user');

passport.use(new LocalStrategy(
    function(email, password, done){
        User.findOne({ email : email}, function(err, user){
            if (err) { return done(err);}
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.email);
});

passport.deserializeUser(function(email, done) {
    User.findOne({email : email}, function(err, user) {
        done(err, user);
    });
});

module.exports = {
    userMiddleware : function(req, res, next) {
        if(!req.user) res.redirect('/login');
        else next();
    },
    startSessionMiddleware : passport.authenticate('local', { 
            failureRedirect: '/login?failed',
            failureFlash : true
    }),
    endSessionMiddleware :  function(req,res){
        req.logout();
        res.redirect('/login');
    },
    sessionData : function(req, res, next){
        if(req.user){
            var email = req.user.email;
            res.send({email : email});
        }else{
            res.status(401).send();
        }
    }
}