export function formatDate(val){
    if (!val) return "";
  const jsDate = typeof val === "string" ? new Date(val) : val;
  if (!(jsDate instanceof Date) || isNaN(jsDate)) return String(jsDate);

    return `${jsDate.getMonth()}/${jsDate.getDate()}/${jsDate.getFullYear()} ${jsDate.getHours()}:${jsDate.getMinutes()}:${jsDate.getSeconds()}`;
}