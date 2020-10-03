import * as mongoose from 'mongoose';
import * as shortid from 'shortid';
import * as express from 'express';

const Token = mongoose.model('token');

export const generate = (callback: () => any) => {
    var newToken = new Token();
    newToken.save(callback);
};

export const tokenMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
             
        var secret = (req.get('Authorization') || req.query.token) as string;
        
        if(!secret) {
            console.log("token: Someone tried to make a request with no token");
            res.status(401).send('No Token Provided');
            return;
        }

        secret = secret.replace(/Bearer/g,'').trim();

        Token.count({ secret : secret }, function(err, count){
            if(count > 0) next();
            else{
                console.log("token: Someone tried to use an invalid token");
                res.status(401).send('Not Authorized');
            }
        });

    }
}
