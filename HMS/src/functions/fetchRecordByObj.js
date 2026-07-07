import axios from 'axios';
import { getHeader } from "./getHeader";

export async function fetchRecordByObj(lnk, obj) { 
  try {  
    const headers = getHeader();
    const link = `http://localhost:9002/hms/${lnk}`;    //always use GET string in the link to tell that although the http function used is post but it's used as get
    //console.log(lnk); 
    const res = await axios.post(link,obj,{headers: headers}); 

  //  console.log(res.data);
    return res.data;
   
  } catch (error) { 
    const backendError = error.response?.data;

    throw {
      message: backendError?.message || "Failed to fetch record",
      stackTrace: backendError?.stackTrace,
      exceptionDate: backendError?.exceptionDate
    };
  } 
}