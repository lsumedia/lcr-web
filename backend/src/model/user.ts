import { Schema, model} from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken';
import { LCRBackendEnvironment } from 'includes/environment';

const env = process.env as LCRBackendEnvironment;

var UserSchema = new Schema({
  email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true, unique : true},
  bio: String,
  image: String,
  hash: String,
  salt: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.setPassword = function(password: string){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.checkPasswordValid = function(password: string) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    
    return jwt.sign({
        id: this._id,
        email: this.email,
        exp: Math.floor(exp.getTime() / 1000),
    }, env.JWT_SECRET);
};

UserSchema.methods.toAuthJSON = function(){
    return {
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        image: this.image
    };
};

export const UserModel = model('user', UserSchema);