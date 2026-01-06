import axios from 'axios';
// 👉 Fetch child LOV when parent changes
export async function fetchInitParentLov(linkLov, field, parentValue, headers) { 
  try {
    const isSingleChar = parentValue.length === 1;
    const dashIndex = parentValue.indexOf('-');
    const prefix = dashIndex > -1 ? parentValue.substring(0, dashIndex) : parentValue; 
    const isPrefixSingleChar = prefix.length === 1; const useNoDesc = isSingleChar || isPrefixSingleChar; 
    const endpoint = useNoDesc ? `${field}Lov/${parentValue}` : `${field}LovDesc/${parentValue}`;


    const res = await axios.get(`${linkLov}${endpoint}`, { headers }); 
    return res.data;   
  } catch (error) { 
    console.warn("response", error.response?.data); 
  } 
}