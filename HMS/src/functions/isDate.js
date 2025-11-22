export function isDate(date){
    const jsDate = new Date(date);
    return jsDate.toString() !== 'Invalid Date';
}