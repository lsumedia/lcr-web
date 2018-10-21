export var daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

export var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "Smarch"
]

export function niceDate(ISODate: string){

    let timeDate = new Date(ISODate);

    return timeDate.getDate() + " " + months[timeDate.getMonth()] + " " + timeDate.getFullYear();

}