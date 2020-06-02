import { Schema, model} from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as shortid from 'shortid';

import { IEpisode, EpisodeTypes } from '@common/model/episode';

var episodeTypes = [
    "episode",
    "podcast",
    "mix",
    "update"
];

var EpisodeSchema = new Schema(
    {
        _id : { type : String, required : false},
        metafile : { type : String, required: true},
        meta : { type : Object, required : false, default : {}},
        title : { type : String, required: true},
        type : { type : String, enum : episodeTypes, required: false, default : "episode"},
        description : { type : String, required: false, default : ""},
        showSlug : { type : String, required: false},
        tags : { type : String, required: false},
        image : { type : String, required: false},
        public : { type : Boolean, required: false, default : false},
        publishTime : { type : Date, required: false}
    }, 
    {
        timestamps: true
    }
);

EpisodeSchema.plugin(uniqueValidator);

EpisodeSchema.pre('validate', function(next){
    var publishDate = new Date();
    if(!this.publishTime) this.publishTime = publishDate.toISOString();
    if(!this.description) this.description = ""; 
    if(!this._id) this._id = shortid.generate();
    next();
});

EpisodeSchema.methods.getMetaData = function(cb){
    
    request.get(this.metafile, (err, res, body) => {
        try{
            if(err) throw(err);
            var meta = JSON.parse(body);
            cb(null, meta);
        }catch(err){
            cb(err, {});
        }
    });
}

export const EpisodeModel = model<IEpisode>('episode', EpisodeSchema);
