import { Schema, model, Document} from 'mongoose';
import { ISong } from '@common/model/song';

export interface ISongDoc extends ISong, Document {}

const SongSchema = new Schema({
    artist : String,
    title : String,
    album : { type: String, required: false },
    commercial : { type: Boolean, required: false },
    length : Number,
    timestamp : Date
});

export const SongModel = model<ISongDoc>('song', SongSchema);