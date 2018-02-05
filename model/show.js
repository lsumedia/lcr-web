let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var ShowSchema = new Schema(
    {
        title : { type : String, required : true},
        description : { type : String, required : true},
        tags : { type : String, required : false},
        image : { type : String, required : false},
        slug: { type : String, required : false},
        active :  { type : Boolean, required : false, default : true}, 
    }
);  


module.exports = mongoose.model('shows', ShowSchema);