import { IUserDoc } from 'model/user';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { Strategy } from 'passport-local';

const User = mongoose.model<IUserDoc>('user');

passport.use(new Strategy(

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

passport.serializeUser(function(user: IUserDoc, done) {
    done(null, user.email);
});

passport.deserializeUser(function(email: string, done) {
    User.findOne({email : email}, function(err, user) {
        done(err, user);
    });
});

export function userMiddleware(req: Request, res: Response, next: NextFunction) {
    if(!req.user) res.redirect('/login');
    else next();
}

export const startSessionMiddleware = passport.authenticate('local', { 
        failureRedirect: '/login?failed',
        failureFlash : true
}),

export function endSessionMiddleware(req: Request, res: Response){
    req.logout();
    res.redirect('/login');
}

export function sessionData(req: Request, res: Response, next: NextFunction){
    if(req.user){
        var email = req.user.email;
        res.send({email : email});
    }else{
        res.status(401).send();
    }
}