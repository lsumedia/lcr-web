import { Schema, model} from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as shortid from 'shortid';

var TokenSchema = new Schema({
    _id : {type : String},
    secret : {type : String, required : false}
}, {timestamps: true});

// TokenSchema.pre('validate', function(next){
//     if(!this._id) this._id = shortid.generate();
//     crypto.randomBytes(48, (err, buffer) => {
//        var secret = buffer.toString('hex');
//        if(!this.secret) this.secret = secret;
//        next();
//     });
// });

export const TokenModel = model('token', TokenSchema);