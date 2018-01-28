
var crypto = require('crypto');
var shortid = require('shortid');

function TokenController(db){

    var col = db.collection('tokens');

    var _this = this;

    this.generate = function(lifespan = 0){
        return new Promise((resolve, reject) => {  
            crypto.randomBytes(48, function(err, buffer){

                var secret = buffer.toString('hex');

                var token = {
                    _id : shortid.generate(),
                    creation : Date.now(),
                    lastUsed : null,
                    secret : secret
                }

                col.insertOne(token, function(err, r){
                    console.log('token: Added new token with id ' + token._id);
                    resolve(token); 
                });
            });
        });
    }

    this.check = function(secret){
        return new Promise((resolve, reject) => {
            col.find({secret : secret}).count(function(err, result){
                if(result > 0){
                    resolve();
                    col.update({secret : secret}, {$set : {lastUsed : Date.now()}}, false, true);   //Update lastUsed value
                } 
                else reject();
            });
        });
    }

    this.getAll = function(limit = 0, skip = 0){

        return new Promise((resolve, reject) =>
        { 
            col.find({}, {creation : 1, lastUsed : 1}).limit(limit).skip(skip).toArray(function(err, docs){
                //docs.map((doc) => { delete doc.secret; });
                if(err) reject(err);
                else resolve(docs);
            });
        });
    }

    this.delete = function(id){
        return new Promise((resolve, reject) => {
            
            col.deleteOne({_id: id}, function(err, results){
                if(err || (results.result.n == 0)){ 
                    reject(err); 
                    return;
                }
                else{
                    console.log("token: Deleted token with id " + id);
                    resolve();
                }
            });
        });
    }

    this.getSecret = function(id){
        return new Promise((resolve, reject) =>
        { 
            col.find({_id : id}).limit(1).toArray(function(err, docs){
                if(err) reject(err);
                else resolve(docs[0]);
            });
        });
    }

    this.tokenMiddleware = function(){

        return function(req, res, next){
             
            var secret = (req.get('Authorization') || req.query.token);
            
            if(!secret) {
                console.log("token: Someone tried to make a request with no token");
                res.status(401).send('No Token Provided');
                return;
            }

            secret = secret.replace(/Bearer/g,'').replace(/ /g,'');
            
            _this.check(secret).then(() => {
                next();
            }, () => {
                console.log("token: Someone tried to use an invalid token");
                res.status(401).send('Not Authorized');
            });

        }

    }

}

module.exports = TokenController;
