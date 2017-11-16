
const crypto = require('crypto');


function TokenController(db){

    var col = db.collection('tokens');

    var _this = this;

    this.generate = function(lifespan = 0){
        return new Promise((resolve, reject) => {

        });
    }

    this.check = function(token){
        return new Promise((resolve, reject) => {
            if(token == "password") resolve();
            else reject();
        });
    }

    this.getAll = function(){

    }

    this.delete = function(){

    }

    this.getSecret = function(id){

    }

    this.authenticateToken = function(){

        return function(req, res, next){
             
            var token = (req.get('Authorization') || req.query.token);
            
            if(!token) {
                res.status(401).send('No Token Provided');
                return;
            }

            token = token.replace(/Bearer/g,'').replace(/ /g,'');
            
            _this.check(token).then(() => {
                next();
            }, () => {
                res.status(401).send('Not Authorized');
            });

        }

    }

}

module.exports = TokenController;
