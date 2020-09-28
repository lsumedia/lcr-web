
export interface IScheduleSlot{
    _id: string;
    showSlug: string;
    startTime: string;
    endTime: string;
    starttimeMinutes: number;
    dow: number;    //day of week
}
