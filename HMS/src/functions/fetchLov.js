import axios from 'axios';
// 👉 Fetch LOV data for a field
export async function fetchLov(linkLov, key, headers, setLovMap) {
  try {
    const res = await axios.get(`${linkLov}${key}Lov`, { headers });
    setLovMap(prev => new Map(prev).set(key, res.data));
  } catch (error) {
    console.warn("response", error.response?.data);
  }
}