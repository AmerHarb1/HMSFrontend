export function getValueType(value) {
  if (value == null) return "null";
  if (typeof value === "number") return "number";
  if (!isNaN(Date.parse(value))) return "date";   // detect date strings  
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "string") return "string";
  return "other";
}