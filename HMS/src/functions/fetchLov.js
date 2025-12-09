import axios from 'axios';
// 👉 Fetch LOV data for a field
export async function fetchLov(linkLov, key, headers, setLovMap) {
  try {
    console.log(`${linkLov}${key}Lov`)
    const res = await axios.get(`${linkLov}${key}Lov`, { headers });
    console.log(res.data)
    setLovMap(prev => new Map(prev).set(key, res.data));
  } catch (error) {
    console.log(`${linkLov}${key}`)
    console.warn("response", error.response?.data);
  }
}