import axios from 'axios';
import { getHeader } from "./getHeader";

export async function fetchRecordPageById(link, id) { 
  try {  
    const headers = getHeader();
    const page = 0;
    const pageSize = 10;
    const sortField = '';
    const sortOrder = 'asc';
    const filters={};
    const filterParams = Object.entries(filters)
            .filter(([_, value]) => value && value.length > 0)
            .map(([key, value]) => `${key}=${value.join(",")}`)
            .join("&");
    const pagable = '?page=' + page + '&size=' + pageSize+ '&sort=' + sortField+ ',' + sortOrder + '&filterParams=' + filterParams
    const lnk = `http://localhost:9002/hms/${link}/${id}${pagable}`;
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