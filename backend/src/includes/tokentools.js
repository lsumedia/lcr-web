var mongoose = require('mongoose');
var shortid = require('shortid');

const Token = mongoose.model('token');

module.exports = {

    generate : function(callback){
        var newToken = new Token();
        newToken.save(callback);
    },
    tokenMiddleware : function(req, res, next){
             
        var secret = (req.get('Authorization') || req.query.token);
        
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
