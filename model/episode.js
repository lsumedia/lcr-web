let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var shortid = require('shortid');

var episodeTypes = [
    "episode",
    "podcast",
    "mix",
    "update"
]

var EpisodeSchema = new Schema(
    {
        _id : { type : String, required : false},
        metafile : { type : String, required: true},
        title : { type : String, required: true},
        type : { type : String, enum : episodeTypes, required: true},
        description : { type : String, required: false},
        showSlug : { type : String, required: false},
        tags : { type : String, required: false},
        image : { type : String, required: false},
        public : { type : Boolean, required: false, default : false},
        publishTime : { type : Date, required: true}
    }
);  

EpisodeSchema.pre('save', next => {
    var publishDate = new Date();
    if(!this.publishTime){
        this.publishTime = publishDate.toISOString();
    }
    next();
});

EpisodeSchema.pre('save', next => {
    if(!this._id){
        this._id = shortid.generate();
    }
});

module.exports = mongoose.model('episodes', EpisodeSchema);