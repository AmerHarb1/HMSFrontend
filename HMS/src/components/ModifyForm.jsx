import { Typography, Space, message, DatePicker} from 'antd';
import axios from 'axios';
import dayjs from "dayjs";
import { useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router';
import { getAccessToken } from "../functions/getAccessToken.js";
import { fetchInitLov } from "../functions/fetchInitLov.js";
import {  fetchInitChildLov } from "../functions/fetchInitChildLov.js";
import {clearDescendants} from "../functions/clearDecendents.js";
import {resolvePrimaryKey} from "../functions/resolvePrimaryKey.js";
import {fixFormDataLov} from "../functions/fixFormDataLov.js";
import {  lovChange } from "../functions/lovChange.js";
import {  lovInit } from "../functions/lovInit.js";
import '../styles/page.css';

export function ModifyForm(props){
    const { state } = useLocation();
    const accessToken = getAccessToken();

    const lnk =state?state.lnk:props.lnk;
    const { rec } = useLocation().state;
    const [formData, setFormData] = useState(rec);
    const [lovMap, setLovMap] = useState(new Map());
    const [parentChildLovMap, setParentChildLovMap] = useState(() => new Map());
    
  //const apiLnk ='http://localhost:9002/hms/' +lnk+'/'+ (rec.id == null ? rec.code? rec.id:null:null);
    const apiLnk = `http://localhost:9002/hms/${lnk}/${resolvePrimaryKey(rec)}`;
    const createdBy = state.createdBy;
  	const createdOn = state.createdOn;
    const comments = state.comments;
	const initialData = Object.values(state.rec); 
    const tabDataValues = state ? state.initialData : props.obj;
    
    const tabData = state?state.tabData:props.obj;
    const formName =state?state.page:null;
    const localLovMap = new Map();
    const excludeFields=state.excludeFields;
    const linkLov = "http://localhost:9002/hms/";
    const [tabDataNoChar, setTabDataNoChar] = useState(initialData);
    const [dateCols, setDateCols] = useState([]);
    // find the row in tabDataValues that matches the current record

    const getRowKey = (row) => row.id ?? row.code ?? row.pk?.code; 
    const recKey = rec.id ?? rec.code ?? rec.pk?.code; 
    const rowIndex = tabDataValues.findIndex(row => getRowKey(row) === recKey);

    //const rowIndex = tabDataValues.findIndex(row => row.id === rec.id || row.id === rec.code || row.id === rec.pk.code );
 
    // fallback if not found
    const currentRow = rowIndex >= 0 ? tabDataValues[rowIndex] : rec;
    const navigate = useNavigate();
 
    const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
        withCredentials: true,
    };
    
   const cancelClicked = () => {
    
        navigate({
            pathname: '/' + lnk,
            search: '',   // 👈 clear query params
            hash: ''      // 👈 clear any hash too
        }, { replace: true });
    };

    const handleChange = (event) => {
    	const { name, value } = event.target;
    	setFormData((prevFormData) => ({  ...prevFormData,[name]: value }));   
  	};

    const handleLovChange = (event) => {
        const { name, value } = event.target;         
        const updatedFormData = { ...formData, [name]: value }; // Build the updated formData manually
        setFormData(updatedFormData);
        lovChange(updatedFormData, name, parentChildLovMap, setLovMap, headers, linkLov);
    };
    
    const updateClicked = (event) => {
  		event.preventDefault();
  		
		const obj = tabData.reduce((o, key) => ({ ...o, [key]: key=="id"?rec.id
                                                        :key=="code"?rec.code
                                                        :key=="pk"?rec.pk.code
														:key=="createdBy"?createdBy
														:key=="createdon"?createdOn
                                                        :key=="comments"?comments
														: formData[key]==''?initialData[tabData.indexOf(key)]:formData[key]}), {})//Object.assign({}, ...Object.entries({...formObj}).map(([a,b]) => ({ [b]: formData[b] })))							
                                                  
	  	axios.put(apiLnk,obj,{headers: headers}
  				).then(() => {navigate('/'+lnk);})
  				  .catch((error) => {
                    if (Array.isArray(error.response?.data)) {
                        message.error(error.response.data.join(", "));
                    } else if (error.response?.data?.message) {
                        message.error(error.response.data.message);
                    } else {
                        message.error("An error occurred");
                    }                    
                  });
	};
	
	const deleteClicked = (event) => {
  		event.preventDefault();
  		var answer = window.confirm("Are you sure you want to Delete data?");
    	if (answer) {
		  // Save it!
		  axios.delete(apiLnk,{headers: headers}
  				).then(() => {navigate('/'+lnk);})
  				  .catch((error) => {console.warn("response", error.response?.data)});
		} else {
		  // Do nothing!
		  console.log('Thing was not saved to the database.');
		}
	};
    
    const getLovData = async() => {
        const keys = tabData;
        const row = Array.isArray(tabDataValues) ? tabDataValues[0] : tabDataValues; 
        if (!row) return;
        const lovCols = keys.filter(  
        (key) =>
            typeof row[key] === "string" && row[key].includes(String.fromCharCode(31)) //filter fields that their value includes ascii char 31, they are the Lov fields
        );

        // 1) Build a local parent-child map (not state) 
        const localParentChildMap = new Map(); 

        for (const key of lovCols) { 
            const value = row[key]; 
            const parent = value.substring(value.indexOf(String.fromCharCode(31)) + 1).trim(); //get string after chr(13), it's parent
            if (parent) { 
                // parent can have multiple children; store as array 
                //const existing = localParentChildMap.get(parent) || []; 
                localParentChildMap.set(parent, key); 
            } 
        }

        // 3. Load root LOVs first
        for (const key of lovCols) {
            const value = row[key]; 
            const parent = value .substring(value.indexOf(String.fromCharCode(31)) + 1) .trim(); 
            if (!parent) { // Root LOV
                console.log(key) 
                const lov = await fetchInitLov(linkLov, key, headers);
                localLovMap.set(key, lov);
            } 
        }

        // 4. Load child LOVs after roots are ready 
        for (const key of lovCols) { 
            const value = row[key]; 
            const parent = value.substring(value.indexOf(String.fromCharCode(31)) + 1).trim(); 
            if (parent) { 
                const lov = await lovInit(formData, key, localParentChildMap, headers, linkLov); 
                localLovMap.set(key, lov);
            } 
        }
        
        // 5. Push final maps into React state 
        setLovMap(localLovMap); 
        setParentChildLovMap(localParentChildMap);

        keys.forEach((k)=>{
            if(k.endsWith("Date")){
               setDateCols((prev) => [...prev, k]); 
            }
        })   
    };

    useEffect(() => { 
        (async () => { 
            await getLovData(); 
        })(); 
    }, [tabData, tabDataValues]);

    useEffect(() => {
        console.log(lovMap)
        fixFormDataLov(lovMap, formData, tabData, setFormData);
  }, [lovMap]);

  useEffect(() => {
        console.log(parentChildLovMap)
  }, [parentChildLovMap]);

    
    useEffect(() => {
        const cleaned = {};
        Object.entries(state.rec).forEach(([key, value]) => {
            if (typeof value === "string" && value.includes(String.fromCharCode(31))) {
                cleaned[key] = value.substring(0, value.indexOf(String.fromCharCode(31)));
            } else {
                cleaned[key] = value;
            }
        });
        setTabDataNoChar(cleaned);
    }, [tabData]);

    
    return(
        <div className="form-table">
            <Space size={15} direction="vertical">
                <Typography.Text className='Title'>
                    {formName}
                </Typography.Text>
                
                <form  >
                <table className='entry-Tab'>
                    <tbody>  
                        {(tabData)?
                            tabData.map(fieldName =>
                                fieldName in excludeFields ? null :
                                    lovMap.has(fieldName)||lovMap.has(localLovMap)
                                    ?
                                        <tr>					  	
                                            <td>
                                                <label htmlFor="name">{fieldName}:</label></td>
                                            <td key={fieldName}><select  name={fieldName} value={formData[fieldName] ?? ""} onChange={handleLovChange} className='selectInput'>
                                                <option value="">-- Select --</option>
                                                {Array.from(lovMap.get(fieldName) || localLovMap.get(fieldName)|| []).map((opt) => (
                                                    <option  value={resolvePrimaryKey(opt)}>
                                                        {opt.name?opt.name:opt.username?opt.username:opt.description}
                                                    </option>
                                                ))}
                                                </select>
                                            </td>
                                            </tr>
                                    :
                                    dateCols.includes(fieldName)                                                
                                        ?
                                            <tr>				  	
                                                <td><label htmlFor="name">{fieldName}:</label></td>
                                                <td key={fieldName}><DatePicker    id={fieldName} 
                                                                                    name={fieldName} 
                                                                                    value={formData[fieldName] ? dayjs(formData[fieldName], "YYYY-MM-DD  HH:mm:ss") : null}
                                                                                    showTime={{ 
                                                                                        format: 'hh:mm:ss',
                                                                                        minuteStep: 1,
                                                                                        hideDisabledOptions: true
                                                                                        }}
                                                                                    format="MM/DD/YYYY HH:mm:ss" 
                                                                                    placeholder="Select date"
                                                                                    onChange={(date) => {
                                                                                        setFormData((prev) => ({
                                                                                        ...prev,
                                                                                        [fieldName]: dayjs(date).format("YYYY-MM-DDTHH:mm:ss") , // store as ISO string
                                                                                        }));
                                                                                    }}
                                                                                    className='dateField'
    
                                                                    />
                                                </td>
                                            </tr>
                                        :
                                            <tr>					  	
                                                <td><label htmlFor="name">{fieldName}:</label></td>
                                                <td key={fieldName}><input type="text"  id={fieldName} name={fieldName} value={formData[fieldName] ?? ""} onChange={handleChange}/></td>
                                            </tr>) :null
                                                								  	
                        }	
                        <tr>
                            <td><button className="form-button" onClick={updateClicked}>Update</button></td>
                            <td><button className="form-button" onClick={deleteClicked}>Delete</button></td>
                            <td><button className="form-button" onClick={cancelClicked}>Cancel</button></td>
                        </tr>
                    </tbody>
                </table>
		    </form>
            </Space>
        </div>
    );
}