import axios from 'axios';
// 👉 Fetch child LOV when parent changes
export async function fetchChildLov(linkLov, childKey, parentValue, headers, setLovMap) { 
  try {      
    //console.log(`${linkLov}${childKey}Lov/${parentValue}`); 
    const res = await axios.get(`${linkLov}${childKey}Lov/${parentValue}`, { headers }); 
    setLovMap(prev => {
      const next = new Map(prev);   // clone existing
      next.set(childKey, res.data); // update child only
      return next;
    });   
  } catch (error) { 
    console.warn("response", error.response?.data); 
  } 
}