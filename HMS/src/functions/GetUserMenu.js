import axios from 'axios';
import {useState} from 'react';

export function GetUserMenu(accessToken, username){
    const link = 'http://localhost:9002/hms/userAccess';
    console.log('in GetUserMenu '+username + '  ' + accessToken);
    const [data, setData] = useState(null);
    const axiosInstance = axios.create({baseURL: link}); 
    const getDataLoading = async() => {	
        console.log('in getDataLoading '+username + '  ' + accessToken); 
		const options = {
						  method: "get",
						  url: link+'?username='+username,
						  headers: {'Authorization':'Bearer ' + accessToken,'Access-Control-Allow-Origin': link,withCredentials: true},
						  params: null			  
						 };
		 try {
			 
		   const { data } = await axiosInstance.request(options);
		   console.log('waiting for response from getUserMenu ' + data.content);
           setData(data.content)
		  } 
		 catch(error){
		   console.log(error)
		 } 
	}
    getDataLoading();
return data;
}