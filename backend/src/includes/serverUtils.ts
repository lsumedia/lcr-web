import * as express from "express";
import * as passport from 'passport';
const cookieSession = require('cookie-session');
const flash = require('express-flash');

export function SetupServer(app: express.Express): void {
    
    /** Express app initiation **/
    this.app.use(cookieSession({
        name : 'session',
        keys : [process.env.SECRET],
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }));

    this.app.use(flash());
    this.app.use(express.urlencoded({extended : false}));
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    //Disable cache
    //TOOO find out why this was enabled
    // app.use(function(req, res, next){
    //     res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); 
    //     res.setHeader("Pragma", "no-cache"); 
    //     res.setHeader("Expires", 0);
    //     next();
    // });

}