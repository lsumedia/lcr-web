let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var shortid = require('shortid');

var SongSchema = new Schema({
    artist : String,
    title : String
}, {timestamps: true});

module.exports = mongoose.model('playedsongs', SongSchema);