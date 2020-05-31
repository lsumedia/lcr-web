let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var shortid = require('shortid');

var SongSchema = new Schema({
    artist : String,
    title : String,
    album : { type: String, required: false },
    commercial : { type: Boolean, required: false },
    length : Number,
    timestamp : Date
});

module.exports = mongoose.model('song', SongSchema);