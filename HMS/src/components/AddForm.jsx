import { Typography, Space, message, DatePicker} from 'antd';
import axios from 'axios';
import { useState, useEffect} from 'react';
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
    const accessToken = getAccessToken();

    const [formData, setFormData] = useState(
        state ? state.tabData.reduce((a, v) => ({ ...a, [v]: "" }), {}) : props.obj
    );

    //const obj = { ...tabData.reduce((o, key) => ({ ...o, [key]: formData[key] }), {}), serviceProductId: formData.serviceProductId };

    const tabData = state ? state.tabData : props.obj;
    const serviceFormData = state.serviceFormData;
    const backLink = state.backLink;
    const backId = state.backId;
    
    const tabDataValues = state ? state.initialData : props.obj;
    const formName = state ? state.page : props.name;
    const lnk = state ? state.lnk : props.lnk;
    const excludeFields = state.excludeFields;
    const masterData=state?state.masterData:props.masterData;

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
console.log(backId)
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
                console.log(backId);
                console.log(serviceFormData);
                navigate("/" + backLink, { 
                    state: { 
                        backId: backId, 
                        excludeFields: excludeFields, 
                        serviceFormData: serviceFormData,
                        masterData: masterData,
                        from: "ServiceProductDetail" } 
                }); 
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
    if (Array.isArray(tabDataValues) && tabDataValues[0]?.serviceProductId) { 
        setFormData(prev => ({ ...prev, serviceProductId: tabDataValues[0].serviceProductId })); 
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
                            {state?(tabData)?
                                tabData.map(field=>                                     
                                    field in excludeFields
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