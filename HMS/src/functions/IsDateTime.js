import {  isDate } from "./isDate.js";
export function isDateTime(value){
  //console.log(value)
    if (!value) return false;
  //  if(!isDate) return false;
  //  console.log(value)
  //return value.includes(" ") || value.includes("T");
  return value === "LocalDateTime";
}