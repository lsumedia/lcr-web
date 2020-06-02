import { Schema, model} from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as shortid from 'shortid';
import { slugMaker } from 'slug';

var ShowSchema = new Schema(
    {
        title : { type : String, required : true},
        description : { type : String, required : false, default : ""},
        tags : { type : String, required : false, default : ""},
        image : { type : String, required : false},
        slug: { type : String, required : false, index : true, unique : true},
        active :  { type : Boolean, required : false, default : true}
    }, 
    {
        timestamps: true
    }
);  

ShowSchema.plugin(uniqueValidator);

ShowSchema.pre('validate', function(next){
    if(!this.slug) this.slug = slugMaker(this.title.toLowerCase());
    next();
});


export const ShowModel = model('show', ShowSchema);