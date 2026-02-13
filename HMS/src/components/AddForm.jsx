import { Typography, Space, message, DatePicker} from 'antd';
import axios from 'axios';
import { useState, useEffect, forwardRef} from 'react';
import { useNavigate, useLocation} from 'react-router';
import dayjs from "dayjs";
import { getAccessToken } from "../functions/getAccessToken.js";
import {resolvePrimaryKey} from "../functions/resolvePrimaryKey.js";
import {  getLovData } from "../functions/getLovData.js";
import {  lovChange } from "../functions/lovChange.js";
import {resolveDescription} from "../functions/resolveDescription.js";
import '../styles/page.css';

export function AddForm(props){
    const { state } = useLocation();
    const masterId = state.masterId?state.masterId:props.masterId;
    const forwardKey = state.forwardKey?state.forwardKey:props.forwardKey;
    const accessToken = getAccessToken();    
    const serviceFormData = state.serviceFormData;
    const [formData, setFormData] = useState(
            () => { const base = state ? state.tabData.reduce((a, v) => ({ ...a, [v]: "" }), {}) : props.obj; 
            if (forwardKey) { 
                return { ...base, [forwardKey]: masterId }; 
            }
            return base; 
    });
   // 
   // const [formData, setFormData] = useState(serviceFormData);
    //const obj = { ...tabData.reduce((o, key) => ({ ...o, [key]: formData[key] }), {}), serviceProductId: formData.serviceProductId };

    const tabData = state ? state.tabData : props.obj;
    
    const backLink = state ? state.backLink:props.backLink;
    const backId = state ? state.backId:props.backId;
    
    const tabDataValues = state ? state.initialData : props.obj;
    const formName = state ? state.page : props.name;
    const lnk = state ? state.lnk : props.lnk;
    const excludeFields = state.excludeFields;
    const detailExcludeFields = state.detailExcludeFields;
    const masterFields=state?state.masterFields:props.masterFields;
    const masterCode=state?state.masterCode:props.masterCode;
    const masterCodeValue=state?state.masterCodeValue:props.masterCodeValue;
    const masterLocalLovMap = state?state.masterLocalLovMap:props.masterLocalLovMap;
    
    const detail = props.detail;
    
console.log(tabDataValues)
    //setFormData(prev => ({ ...prev, serviceProductId: tabDataValues?.serviceProductId ?? "" }));
    
    const navigate = useNavigate();
    const linkLov = "http://localhost:9002/hms/";
    const [lovMap, setLovMap] = useState(new Map());
    const [dateCols, setDateCols] = useState([]);
    const [parentChildLovMap, setParentChildLovMap] = useState(new Map());
    const link = "http://localhost:9002/hms/" + lnk;

    const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
        withCredentials: true,
    };

    const cancelClicked = () => navigate("/" + lnk);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLovChange = (event) => {
        const { name, value } = event.target;         
        const updatedFormData = { ...formData, [name]: value }; // Build the updated formData manually
        setFormData(updatedFormData);
        lovChange(updatedFormData, name, parentChildLovMap, setLovMap, headers, linkLov);
    };

    const handleSubmit = (event) => {
        console.log(backLink);
        event.preventDefault();
        const obj = tabData.reduce((o, key) => ({ ...o, [key]: formData[key] }), {});
        axios
        .post(link, obj, { headers })
        .then(() => {
            if (backLink) { 
                if(backLink === 'back'){
                    navigate(-1, { 
                        state: { 
                            backId: backId, 
                            masterId: masterId,
                            excludeFields: excludeFields, 
                            detailExcludeFields: detailExcludeFields,
                            detail: detail,
                            tabData:tabData,
                            rec: serviceFormData,
                            masterFields: masterFields,
                            masterCode: masterCode,
                            masterCodeValue:masterCodeValue,
                            masterLocalLovMap:masterLocalLovMap,
                            backLink:backLink,
                            title:formName,                                
                            from: formName } 
                            });
                }else{
                    navigate("/" + backLink, { 
                        state: { 
                            backId: backId, 
                            masterId: masterId,
                            excludeFields: excludeFields, 
                            detailExcludeFields: detailExcludeFields,
                            detail: detail,
                            tabData:tabData,
                            rec: serviceFormData,
                            masterFields: masterFields,
                            masterCode: masterCode,
                            masterCodeValue:masterCodeValue,
                            masterLocalLovMap:masterLocalLovMap,
                            backLink:backLink,
                            title:formName,                                
                            from: formName } 
                        
                    });
                } 
            } else 
                { 
                    console.log('front');
                    navigate("/" + lnk, { 
                        state: { serviceFormData: obj } 
                    });
                } 
            })
        .catch((error) => {
            alert(error.response?.data)
            if (Array.isArray(error.response?.data)) {
                message.error(error.response.data.join(", "));
            } else if (error.response?.data?.message) {
                message.error(error.response.data.message);
            } else {
                message.error("An error occurred");
            }
        });
    };

  useEffect(() => {
    getLovData(tabData, tabDataValues, setParentChildLovMap, setLovMap, linkLov, headers, setDateCols);
  }, []);

  useEffect(() => {
    console.log(formData)
  }, [formData]);

  useEffect(() => {
    console.log(forwardKey);
    console.log(masterId)
    setFormData((prev) => ({ ...prev, [forwardKey]: masterId }));
  }, [forwardKey]);

  useEffect(() => { 
    if (Array.isArray(tabDataValues) && tabDataValues[0]?.serviceProductId) { 
        setFormData(prev => ({ ...prev, forwardKey: tabDataValues[0].forwardKey })); 
    } 
}, [tabDataValues]);

    return(
        <div className="form-table">
            <Space size={15} direction="vertical">
                <Typography.Text className='Title'>
                    {formName}
                </Typography.Text>
                
                <form onSubmit={handleSubmit} >
                    <table className='entry-Tab'>
                        <tbody>   
                            {console.log(formData)}      	
                            {state?(tabData)?
                                tabData.map(field=>                                     
                                    (detailExcludeFields && field in detailExcludeFields) || (excludeFields && field in excludeFields)
                                        ?
                                            null
                                        :                                            
                                            lovMap.has(field)
                                            ?
                                                <tr>					  	
                                                        <td><label htmlFor="name">{field}:</label></td>
                                                    <td key={field}><select  id={field} name={field} value={state?formData?formData[field]:null:null} onChange={handleLovChange} className='selectInput'>
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
                                                                                    value={formData[field]? dayjs(formData[field], "YYYY-MM-DD  HH:mm:ss") : null} 
                                                                                    format="MM/DD/YYYY HH:mm:ss" 
                                                                                    placeholder="Select date"
                                                                                    onChange={(date) => {
                                                                                        setFormData((prev) => ({
                                                                                        ...prev,
                                                                                        [field]: dayjs(date).format("YYYY-MM-DDTHH:mm:ss"), // store as ISO string
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
                                                    </tr>) :null:null
                            }	
				<tr>
			      <td><button className="form-button" type="submit">Submit</button></td>
			      <td><button className="form-button" onClick={cancelClicked}>Cancel</button></td>
			     </tr>
		     </tbody>
		     </table>
                </form>
            </Space>
        </div>
    );
}