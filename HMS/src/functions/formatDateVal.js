export function formatDate(date){
    const jsDate = new Date(date);
    return `${jsDate.getMonth}/${jsDate.getDate}/${jsDate.getFullYear} ${jsDate.getHours}:${jsDate.getMinutes}:${jsDate.getSeconds}`;
}