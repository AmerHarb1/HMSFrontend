// 👉 Parse access token safely
export function getAccessToken() {
  const raw = JSON.parse(localStorage.getItem("accessKey")) || "";
  // If you need to slice, do it here
  const idx = raw.indexOf(",function ()");
  return idx > -1 ? raw.slice(0, idx) : raw;
}