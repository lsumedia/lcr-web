import { Document } from 'mongoose';

export interface IScheduleSlot extends Document{
    _id: string;
    showSlug: string;
    startTime: string;
    endTime: string;
    starttimeMinutes: number;
    dow: number;    //day of week
}
