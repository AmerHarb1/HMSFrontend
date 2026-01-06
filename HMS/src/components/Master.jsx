import { DatePicker , message,  Space, Statistic, Typography } from "antd";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router';
import { getHeader } from "../functions/getHeader";
import {  lovChange } from "../functions/lovChange.js";
import {resolvePrimaryKey} from "../functions/resolvePrimaryKey.js";
import {resolveDescription} from "../functions/resolveDescription.js";
import { MasterDetails } from './MasterDetails';
import {  getLovData } from "../functions/getLovData.js";
import {  getLovDataNoParent } from "../functions/getLovDataNoParent.js";

import '../styles/report.css';

export function Master(props) {
    const { state } = useLocation();
    const safeFormData = state?.serviceFormData ?? {};
    const [ready, setReady] = useState(false);
    const [backReady, setBackReady] = useState(false);
    const [tabData, setTabData] = useState(Object.keys(safeFormData).length > 0 ? Object.keys(safeFormData) : props.masterData);
    const [tabDataValues, setTabDataValues] = useState(Object.keys(safeFormData).length > 0 ? safeFormData : props.tabDataValues);
    const [formData, setFormData] = useState({});
    const [lovMap, setLovMap] = useState(new Map());
    const [parentChildLovMap, setParentChildLovMap] = useState(new Map());//create map that holds the parent child
    const [dateCols, setDateCols] = useState([]);
    const [serviceFormData, setServiceFormData] = useState(state?.serviceFormData ?? {});
    const [serviceAddFormData, setServiceAddFormData] = useState(state?.serviceFormData ?? {});
    const headers = getHeader();
    const linkLov = "http://localhost:9002/hms/";
    const lnk = props.lnk;
    const [forwardKey, setForwardKey] = useState(props.forwardKey);
    //const tabData = ['productType', 'productDivision', 'productGroup', 'productCategory', 'itemNumber'];
    const excludeFields = props.excludeFields;
    let backId = state?state.backId:formData.id;
     
console.log(backId)
    console.log(forwardKey);

    useEffect(() => {
        setFormData(safeFormData)
        //getLovDataNoParent(tabData, tabDataNoChar, setParentChildLovMap, setLovMap, linkLov, headers, setDateCols,setFormData,formData,parentChildLovMap);     
        if(backId){
            console.log(formData)
            getMaster(backId)
        }
    }, [backId]);

    const masterLink = 'http://localhost:9002/hms/'+lnk;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLovChange = (event) => {
        setReady(false);
        const { name, value } = event.target;         
        const updatedFormData = { ...formData, [name]: value }; // Build the updated formData manually
        setFormData(updatedFormData);
        lovChange(updatedFormData, name, parentChildLovMap, setLovMap, headers, linkLov);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        saveMaster();
        
    };

    useEffect(() => {    
         if(backId){
            
            getLovDataNoParent(tabData, formData, setParentChildLovMap, setLovMap, linkLov, headers, setDateCols, setFormData);
            
         }else{
            getLovData(tabData, tabDataValues, setParentChildLovMap, setLovMap, linkLov, headers, setDateCols); 
         }
    }, [tabData]);
 
    useEffect(() => {
        if(backReady && formData !== undefined && formData !== null){
            setReady(true);
        }
    }, [backReady]);
    
   

    return (
        <div className="form-table">
            <Space size={15} direction="vertical">
              <Typography.Title className='TitleRep'>Service Products</Typography.Title>
              <form onSubmit={handleSubmit}>
                  <table className='entry-Tab'>
                      <tbody>
                        {Object.keys(tabData).map(s=>{                             
                            const field = tabData[s];                            
                            return(
                                field in excludeFields
                                    ?
                                        null
                                    :                                            
                                        lovMap.has(field)
                                        ?
                                            <tr>					  	
                                                <td><label htmlFor="name">{field}:</label></td>
                                                <td key={field}><select  id={field} name={field} value={ formData?.[field] ? formData[field]:null} onChange={handleLovChange} className='selectInput'>
                                                    <option value="">-- Select --</option>                                                    
                                                    {Array.from(lovMap.get(field) || []).map((opt) => (
                                                        <option key={resolvePrimaryKey(opt)} value={resolvePrimaryKey(opt)}> 
                                                            {resolveDescription(opt)}
                                                        </option>
                                                    ))}
                                                    </select>
                                                </td>
                                            </tr>
                                        :
                                            dateCols.includes(field)                                                
                                                ?
                                                    <tr>				  	
                                                        <td><label htmlFor="name">{field}:</label></td>
                                                        <td key={field}><DatePicker id={field} 
                                                                                    name={field} 
                                                                                    value={state?formData?formData[field]:null:null} 
                                                                                    format="MM/DD/YYYY HH:mm:ss" 
                                                                                    placeholder="Select date"
                                                                                    onChange={(date) => {
                                                                                        setFormData((prev) => ({
                                                                                        ...prev,
                                                                                        [field]: date ? date.format("YYYY-MM-DDTHH:mm:ss") : null, // store as ISO string
                                                                                        }));
                                                                                    }}
                                                                                    className='dateField'
            
                                                                            />
                                                        </td>
                                                    </tr>
                                                :
                                                    <tr>					  	
                                                        <td><label htmlFor="name">{field}:</label></td>
                                                        <td key={field}><input type="text"  id={field} name={field} value={state?formData?formData[field]:null:null} onChange={handleChange}/></td>
                                                    </tr> 
                            )
                        }
                          
                        )}
                          <tr>
                              <td><button className="form-button" type="submit">Get Service Details</button></td>
                          </tr>
                      </tbody>
              </table>
                  {/* ✅ Render the Income Statement table */}
                  {ready? (                    
                      <MasterDetails    serviceFormData={formData} 
                                        forwardKey={backId?backId:formData[forwardKey]} 
                                        serviceAddFormData= {serviceAddFormData}
                                        backLink={lnk} 
                                        excludeFields={excludeFields}
                                        lnk={lnk+'Detail'}
                                        masterData={props.masterData}/>
                  ):null}
            </form>  
          </Space>         	
        </div>
    );

    function saveMaster() {
        const obj = tabData.reduce((o, key) => ({ ...o, [key]: formData[key] }), {});
        setBackReady(false);
        axios
            .post(masterLink, obj, { headers })
            .then((res) => {
                setFormData((prev) => ({ ...prev, serviceProductId: res.data.id }));
                setBackReady(true);
                
            })
            .catch((error) => {
                alert(error.response?.data);
                if (Array.isArray(error.response?.data)) {
                    message.error(error.response.data.join(", "));
                } else if (error.response?.data?.message) {
                    message.error(error.response.data.message);
                } else {
                    message.error("An error occurred");
                }
            });
    }

    async function getMaster(backId) { 
        try {
                const res = await axios.get(`${masterLink}/${backId}`, { headers }); 
                //setTabDataValues(res.data);
                setTabData(Object.keys(res.data)); 
                setFormData(res.data);
                setBackReady(true); 
            }catch (error) { 
                console.warn("response", error.response?.data); 
            } 
    }
}