import { Schema, model, HookNextFunction, Document} from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as shortid from 'shortid';
import slugify from 'slugify';
import { IShow } from '@common/model/show';

interface IShowDoc extends IShow, Document {}

var ShowSchema = new Schema<IShowDoc>(
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

ShowSchema.pre('validate', function(this, next: HookNextFunction){
    if(!this.get('slug')){
        this.set('slug', slugify(this.get('title')));
    }
    next();
});


export const ShowModel = model<IShowDoc>('show', ShowSchema);