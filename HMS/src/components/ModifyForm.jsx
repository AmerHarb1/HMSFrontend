import { Typography, Space, message, DatePicker} from 'antd';
import axios from 'axios';
import dayjs from "dayjs";
import { useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router';
import { getAccessToken } from "../functions/getAccessToken.js";
import { fetchLov } from "../functions/fetchLov.js";
import {  fetchChildLov } from "../functions/fetchChildLov.js";
import {clearDescendants} from "../functions/clearDecendents.js";
import {resolvePrimaryKey} from "../functions/resolvePrimaryKey.js";
import '../styles/page.css';

export function ModifyForm(props){
    const { state } = useLocation();
    const accessToken = getAccessToken();

    const lnk =state?state.lnk:props.lnk;
    const { rec } = useLocation().state;
    const [formData, setFormData] = useState(rec);
    const [lovMap, setLovMap] = useState(new Map());
    const [parentChildLovMap, setParentChildLovMap] = useState(new Map());
    console.log(rec)
    console.log(state.bodyData)
  //const apiLnk ='http://localhost:9002/hms/' +lnk+'/'+ (rec.id == null ? rec.code? rec.id:null:null);
    const apiLnk = `http://localhost:9002/hms/${lnk}/${resolvePrimaryKey(rec)}`;
    const createdBy = state.createdBy;
  	const createdOn = state.createdOn;
    const comments = state.comments;
	const initialData = Object.values(state.rec); 
    const tabDataValues = state ? state.initialData : props.obj;
    const tabData = state?state.tabData:props.obj;
    const formName =state?state.page:null;
    
    const stringIn={id:"",createdBy:"",createdOn:""};
    const linkLov = "http://localhost:9002/hms/";
    const [tabDataNoChar, setTabDataNoChar] = useState(initialData);
    const [normalized, setNormalized] = useState(false);
    const [dateCols, setDateCols] = useState([]);
    // find the row in tabDataValues that matches the current record
    const rowIndex = tabDataValues.findIndex(row => row.id === rec.id);
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
        setFormData(prev => {
            const next = { ...prev, [name]: value };

            if (parentChildLovMap.has(name)) {
                console.log(`${name} --- ${value}`);

                // clear descendants recursively
                clearDescendants(next, name, parentChildLovMap, setLovMap);

                // fetch LOVs for immediate child only
                
            }

            return next;
        }); 
        const childKey = parentChildLovMap.get(name);
        fetchChildLov(linkLov,childKey, value, headers, setLovMap); 
    };
    
    const updateClicked = (event) => {
  		event.preventDefault();
  		
		const obj = tabData.reduce((o, key) => ({ ...o, [key]: key=="id"?rec.id
                                                        :key=="code"?rec.code
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
    
    const getLovData = () => {
        let keys = tabData;

        const lovCols = keys.filter(  
        (key) =>
            typeof tabDataValues[0][key] === "string" &&
            tabDataValues[0][key].includes(String.fromCharCode(31)) //filter fields that their value includes ascii char 31, they are the Lov fields
        );
        

        lovCols.forEach((key) => {
            const value = tabDataValues[0][key];
            const parent = value.substring(value.indexOf(String.fromCharCode(31)) + 1).trim();
            if (parent) {
                setParentChildLovMap((prev) => new Map(prev).set(parent, key)); //create map that holds the parent child
                //setLovMap((prev) => new Map(prev).set(key, []));
                fetchChildLov(linkLov,key, value, headers, setLovMap);
            } 
            fetchLov(linkLov, key, headers, setLovMap);            
        });

        keys.forEach((k)=>{
            if(k.endsWith("Date")){
               setDateCols((prev) => [...prev, k]); 
            }
        })   
    };

    useEffect(() => {
        getLovData();
    }, []);

    useEffect(() => {
    console.log(lovMap)
  }, [lovMap]);

    useEffect(() => {
        if (lovMap.size > 0 && !normalized) {
            const updated = { ...formData };
            state.tabData.forEach(key => {
                if (lovMap.has(key)) {
                    const options = lovMap.get(key) || [];
                    const rawValue = currentRow[key];   // ✅ use the correct row
                    let displayValue = rawValue;
                    if (typeof rawValue === "string" && rawValue.includes(String.fromCharCode(31))) {
                        displayValue = rawValue.substring(0, rawValue.indexOf(String.fromCharCode(31)));
                    }
                    const match = options.find(
                        opt => opt.name === displayValue || opt.username === displayValue || opt.description === displayValue
                    );
                    if (match) {
                        updated[key] = match.id;
                    }
                }
            });
            setFormData(updated);
            setNormalized(true); // ✅ only normalize once
        }
    }, [lovMap, normalized]);

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
                                fieldName in stringIn ? null :
                                    lovMap.has(fieldName)
                                    ?
                                        <tr>					  	
                                            <td>{console.log(formData)} 
                                                {console.log("Select value:", fieldName, formData[fieldName]??"")}
                                                <label htmlFor="name">{fieldName}:</label></td>
                                            <td key={fieldName}><select  name={fieldName} value={formData[fieldName] ?? ""} onChange={handleLovChange} className='selectInput'>
                                                <option value="">-- Select --</option>
                                                {Array.from(lovMap.get(fieldName) || []).map((opt) => (
                                                    <option key={resolvePrimaryKey(opt)} value={resolvePrimaryKey(opt)}>
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