let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var shortid = require('shortid');
var crypto = require('crypto');

var TokenSchema = new Schema({
    _id : {type : String},
    secret : {type : String, required : false},
}, {timestamps: true});

TokenSchema.pre('validate', function(next){
    if(!this._id) this._id = shortid.generate();
    crypto.randomBytes(48, (err, buffer) => {
       var secret = buffer.toString('hex');
       if(!this.secret) this.secret = secret;
       next();
    });
});

module.exports = mongoose.model('token', TokenSchema);