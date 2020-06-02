import { Schema, model} from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as shortid from 'shortid';

var ScheduleSlotSchema = new Schema(
    {
        _id : { type : String, required : false},
        showSlug : { type : String, required: true},
        startTime : { type : String, required: true},
        endTime : { type : String, required: true},
        startTimeMinutes : { type : Number, required: false},
        dow : {type : Number, min : 1, max : 7, required: true}
    },
    {
        timestamps: true
    }
);

ScheduleSlotSchema.plugin(uniqueValidator);

ScheduleSlotSchema.pre('validate', function(next){
    var startTimeComponents = this.startTime.split(":");
    var startTimeMinutes = (Number(startTimeComponents[0]) * 60) + Number(startTimeComponents[1]);
    this.startTimeMinutes = startTimeMinutes;
    if(!this._id) this._id = shortid.generate();
    next();
});

module.exports = model('scheduleslot', ScheduleSlotSchema);
