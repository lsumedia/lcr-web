let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var CommentSchema = new Schema(
    {
        comment : { type : String, required: true},
        authorName : { type : String, required: true},
        postedTime : { type:  Date, required : true},
        read : { type: Boolean, default: false}
    }, 
    { 
      versionKey: false
    }
);