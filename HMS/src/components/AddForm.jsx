import { Typography, Space, message, DatePicker} from 'antd';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router';
import dayjs from "dayjs";
import { getAccessToken } from "../functions/getAccessToken.js";
import { fetchLov } from "../functions/fetchLov.js";
import {  fetchChildLov } from "../functions/fetchChildLov.js";
import '../styles/page.css';

export function AddForm(props){
    const { state } = useLocation();
    const accessToken = getAccessToken();

    const [formData, setFormData] = useState(
        state ? state.tabData.reduce((a, v) => ({ ...a, [v]: "" }), {}) : props.obj
    );
    const tabData = state ? state.tabData : props.obj;
    const tabDataValues = state ? state.initialData : props.obj;
    const formName = state ? state.page : props.name;
    const lnk = state ? state.lnk : props.lnk;
    const stringIn = { id: "", createdBy: "", createdOn: "" };
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
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (parentChildLovMap.has(name)) {
            const childKey = parentChildLovMap.get(name);
            fetchChildLov(linkLov, childKey, value, headers, setLovMap, setFormData);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const obj = tabData.reduce((o, key) => ({ ...o, [key]: formData[key] }), {});
        axios
        .post(link, obj, { headers })
        .then(() => navigate("/" + lnk))
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

    const getLovData = () => {
        let keys = tabData;
        /*
        if (tabData !== null && Array.isArray(tabData) && tabData.length > 0) {
            keys = Object.keys(tabData);
            console.log(tabDataValues[0]);
        }
*/
        const lovCols = keys.filter(  
            (key) =>
                typeof tabDataValues[0][key] === "string" &&
                tabDataValues[0][key].includes(String.fromCharCode(31)) //filter fields that their value includes ascii char 31, they are the Lov fields
            );
   
        //setDateKeys(keys.filter((k) => tabData[k].endsWith("Date")));   //filter fields that their name ends with a postfix "Date", they are the Date fields 

        lovCols.forEach((key) => {
            const value = tabDataValues[0][key];
            const parent = value.substring(value.indexOf(String.fromCharCode(31)) + 1).trim();
            if (parent) {
                setParentChildLovMap((prev) => new Map(prev).set(parent, key)); //create map that holds the parent child
                setLovMap((prev) => new Map(prev).set(key, []));
            } else {
                fetchLov(linkLov, key, headers, setLovMap);
            }
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
                                Object.keys(tabData).map(s=>                                     
                                    tabData[s] in stringIn
                                        ?
                                            null
                                        :                                            
                                            lovMap.has(tabData[s])
                                            ?
                                                <tr>					  	
                                                        <td><label htmlFor="name">{tabData[s]}:</label></td>
                                                    <td key={tabData[s]}><select  id={tabData[s]} name={tabData[s]} value={state?formData?formData[s]:null:null} onChange={handleLovChange} className='selectInput'>
                                                        <option value="">-- Select --</option>
                                                        {Array.from(lovMap.get(tabData[s]) || []).map((opt) => (
                                                            <option key={opt.id?opt.id:opt.code} value={opt.id?opt.id:opt.code}>
                                                                {opt.name?opt.name:opt.username}
                                                            </option>
                                                        ))}
                                                        </select>
                                                    </td>
                                                 </tr>
                                            :
                                                dateCols.includes(tabData[s])                                                
                                                ?
                                                    <tr>				  	
                                                        <td><label htmlFor="name">{tabData[s]}:</label></td>
                                                        <td key={tabData[s]}><DatePicker    id={tabData[s]} 
                                                                                            name={tabData[s]} 
                                                                                            value={state?formData?formData[s]:null:null} 
                                                                                            format="MM/DD/YYYY" 
                                                                                            placeholder="Select date"
                                                                                            onChange={(date) => {
                                                                                                setFormData((prev) => ({
                                                                                                ...prev,
                                                                                                [tabData[s]]: date ? date.format("YYYY-MM-DD") : null, // store as ISO string
                                                                                                }));
                                                                                            }}
                                                                                            className='dateField'
            
                                                                            />
                                                        </td>
                                                    </tr>
                                                :
                                                    <tr>					  	
                                                        <td><label htmlFor="name">{tabData[s]}:</label></td>
                                                        <td key={tabData[s]}><input type="text"  id={tabData[s]} name={tabData[s]} value={state?formData?formData[s]:null:null} onChange={handleChange}/></td>
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