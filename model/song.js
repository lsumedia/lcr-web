let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var shortid = require('shortid');

var SongSchema = new Schema({
    artist : String,
    title : String,
    timestamp : Date
});

module.exports = mongoose.model('song', SongSchema);