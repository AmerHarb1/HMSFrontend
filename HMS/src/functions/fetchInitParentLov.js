import axios from 'axios';
// 👉 Fetch child LOV when parent changes
export async function fetchInitParentLov(linkLov, field, parentValue, headers) { 
  try {
    if(parentValue){
      const isSingleChar = parentValue.length === 1;
      const dashIndex = parentValue.indexOf('-');
      const prefix = dashIndex > -1 ? parentValue.substring(0, dashIndex) : parentValue; 
      const isPrefixSingleChar = prefix.length === 1; 
      const useNoDesc = isSingleChar || isPrefixSingleChar; 
      const endpoint = useNoDesc ? `${field}Lov/${parentValue}` : `${field}LovDesc/${parentValue}`;

      const parent = endpoint.includes(String.fromCharCode(31)) ? endpoint.substring(0, endpoint.indexOf(String.fromCharCode(31))) : endpoint;

      const res = await axios.get(`${linkLov}${parent}`, { headers }); 

      return res.data; 
    }  
  } catch (error) { 
    const backendError = error.response?.data;

    throw {
      message: backendError?.message || "Failed to load LOV",
      stackTrace: backendError?.stackTrace,
      exceptionDate: backendError?.exceptionDate
    };
  } 
}