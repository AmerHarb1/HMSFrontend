import axios from 'axios';
// 👉 Fetch LOV data for a field
export async function fetchInitLov(linkLov, key, headers) {
  try {
    const res = await axios.get(`${linkLov}${key}Lov`, { headers });
    return res.data; // return LOV list
  } catch (error) {
    console.log(`${linkLov}${key}`)
    console.warn("response", error.response?.data);
  }
}