import axios from 'axios';
import React,{ useState, useEffect} from 'react';
import { Typography, Space} from 'antd';
import './AppPage.css';
import { getHeader } from "../functions/getHeader";

export function AppHeader(){
    const link = 'http://localhost:9002/hms/branchName';
    const headers = getHeader();
    const [tabData, setTabData] = useState([]);
    const [loading, setloading ] = useState(true);

    const getData = async() => {
        axios.get(link,{headers: headers}
  			).then(res => {                                
                setTabData(res.data);   //res.data.content is an array of objects
                })
			  .catch((error) => {
                console.warn("response", error.response?.data);                
              })
              .finally(()=>{
                 setloading(false);
              });	
    }

    useEffect(() => {
            getData();
          }, []);

    return(
        <div className="AppHeader">
            <div className="title">{tabData.orgName}</div>
            <div className="subtitle">{tabData.branchName}
             <br/>
                {tabData.cityName + ',  ' + tabData.stateName}
            </div>
            
            
            
        </div>
    );
}