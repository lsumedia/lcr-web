import { Schema, model} from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as shortid from 'shortid';

var SongSchema = new Schema({
    artist : String,
    title : String,
    album : { type: String, required: false },
    commercial : { type: Boolean, required: false },
    length : Number,
    timestamp : Date
});

export const SongModel = model('song', SongSchema);