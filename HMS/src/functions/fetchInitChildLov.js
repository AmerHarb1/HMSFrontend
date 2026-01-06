import axios from 'axios';
// 👉 Fetch child LOV when parent changes
export async function fetchInitChildLov(linkLov, childKey, parentValue, headers) { 
  try {      
  //  console.log(`${linkLov}${childKey}Lov/${parentValue}`); 
    const res = await axios.get(`${linkLov}${childKey}Lov/${parentValue}`, { headers }); 
    return res.data;   
  } catch (error) { 
    console.warn("response", error.response?.data); 
  } 
}