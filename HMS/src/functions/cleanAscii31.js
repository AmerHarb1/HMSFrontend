// 👉 Clean ASCII 31 from strings
export function cleanAscii31(value) {
  if (typeof value === "string" && value.includes(String.fromCharCode(31))) {
    return value.substring(0, value.indexOf(String.fromCharCode(31)));
  }
  return value;
}