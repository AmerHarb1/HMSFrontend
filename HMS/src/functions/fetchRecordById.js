import axios from 'axios';
import { getHeader } from "./getHeader";

export async function fetchRecordById(link, id) { 
  try {  
  //  console.log(id);
    const headers = getHeader();
    const lnk = `http://localhost:9002/hms/${link}/${id}`;
  //  console.log(lnk); 
    const res = await axios.get(lnk, { headers }); 
  //  console.log(res.data);
    return res.data;
   
  } catch (error) { 
    const backendError = error.response?.data;
//console.log(backendError.message);
    throw {
      message: backendError?.message || "Failed to fetch record",
      stackTrace: backendError?.stackTrace,
      exceptionDate: backendError?.exceptionDate
    };
  } 
}