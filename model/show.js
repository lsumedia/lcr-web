const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')
const slugMaker = require('slug');

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


module.exports = mongoose.model('show', ShowSchema);