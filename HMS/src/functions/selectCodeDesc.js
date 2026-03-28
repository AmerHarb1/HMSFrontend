import {  resolvePrimaryKey } from "./resolvePrimaryKey.js";
import {  resolveDescription } from "./resolveDescription.js";
export function selectCodeDesc(rec, val) {

  if (!rec || !val) return null;
  //console.log(val)
  // Prefer numeric id if present
  if (val.length < 4) {
    return resolvePrimaryKey(rec);
  }else{
    return resolveDescription(rec);
  }
}