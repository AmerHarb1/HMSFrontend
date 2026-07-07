import dayjs from "dayjs";
export function getJsDate(selectedDate) {
    let jsDate;
    // If it's already a JS Date
    if (selectedDate instanceof Date) {
        jsDate = selectedDate;
    }
    // If it's a Dayjs object
    else if (selectedDate.$d instanceof Date) {
        jsDate = selectedDate.toDate();
    }
    // If it's a string like "2026-06-09"
    else {
        jsDate = dayjs(selectedDate, "YYYY-MM-DD").toDate();
    }
    return jsDate
}