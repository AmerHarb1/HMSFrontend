import axios from 'axios';
import {React,useEffect,useState} from 'react';
import { useNavigate} from 'react-router';
import { FaUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { GetUserMenu } from '../functions/GetUserMenu.js';
import { fetchInitLov } from "../functions/fetchInitLov.js";
import {resolvePrimaryKey} from "../functions/resolvePrimaryKey.js";
import {fixFormDataLov} from "../functions/fixFormDataLov.js";
import {  lovChange } from "../functions/lovChange.js";
import {  lovInit } from "../functions/lovInit.js";
import { getHeader } from "../functions/getHeader.js";
import { toSpacedWords } from "../functions/toSpacedWords.js";
import '../styles/login.css';

export function Login({ onLoginSuccess, populateUserMenu }){
    const fields = ['username','password','branch'];
	const link = 'http://localhost:9002/hms/login';
    const [formData, setFormData] = useState(fields);
    const [accessToken, setAccessToken] = useState(null);
    const tabData = fields;
    const localLovMap = new Map();
    const headers = {'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:9002/hms/login',withCredentials: true };
    const [lovMap, setLovMap] = useState(new Map());
    const [parentChildLovMap, setParentChildLovMap] = useState(() => new Map());
    const linkLov = "http://localhost:9002/hms/";

    const navigate = useNavigate();

    const cancelClicked = () => {
    	navigate('/');  											
	};

    const handleChange = (event) => {
    	const { name, value } = event.target;
    	//alert(value);
    	setFormData((prevFormData) => ({  ...prevFormData,[name]: value }));   
  	};

    const handleLovChange = (event) => {
        const { name, value } = event.target;         
        const updatedFormData = { ...formData, [name]: value }; // Build the updated formData manually
        //console.log(name +' , '+ value)
        setFormData(updatedFormData);
        lovChange(updatedFormData, name, parentChildLovMap, setLovMap, headers, linkLov);
    };

    const handleSubmit = (event) => {
  		event.preventDefault();
  		const obj = tabData.reduce((o, key) => ({ ...o, [key]: formData[key]}), {})//create obj array that has key value pairs of formData for only keys found in tabData
		axios.post(link,obj,{headers: headers}
  			).then(res => {   
                    //console.log(res.data);//token
                    setAccessToken(res.data.token);
				    localStorage.setItem('accessKey', JSON.stringify(res.data.token));
				    
                    //console.log(accessToken);//token
                    //console.log(res.data.token);//token
                    
                    onLoginSuccess();    
                    //console.log('after receiving response from get token ' + obj.username + '  ' + res.data.menuStructure + '  ' + res.data.token);                
                    populateUserMenu(res.data.menuStructure);                   
                    
				  navigate('/');
				  })
			  .catch((error) => {console.warn("response", error.response?.data)});		
	};

    useEffect(() => {
        lovMap.set(localLovMap)
    }, [localLovMap]);

    useEffect(() => {
       async function loadLov() {
            const lov = await fetchInitLov(linkLov, 'branchLog', headers, 'Main');

            // Create a NEW map so React detects change
            const newMap = new Map();
            newMap.set('branch', lov);

            setLovMap(newMap);   // ✔ React re-renders
        }
        loadLov();        
    }, []);

    return(
        <div className="container">            	  
            <form onSubmit={handleSubmit} className="header">
                <div className="text">Login</div>
                <table >
                    <tbody className="inputs">                                               
                        <tr className="input">	
                            				  	
                            <td key="username"><FaUser className="icon-img"/><input type="text"  id="username" name="username" placeholder='username' onChange={handleChange}/></td>
                        </tr> 				  	
                        <tr className="input">
                            
                            <td key="password"><TbLockPassword className="icon-img"/><input type="password"  id="password" name="password" placeholder='password' onChange={handleChange}/></td>
                        </tr>
                        <tr className="input">	
                            				  	
                            <td key="branch">
                                <FaUser className="icon-img"/>
                                <select name="branch" value={formData["branch"] ?? ""} onChange={handleLovChange} className="selectInput" > 
                                    <option value="">-- Select --</option> 
                                    {Array.from(lovMap.get("branch") || localLovMap.get("branch") || []).map((opt) => ( 
                                        <option key={resolvePrimaryKey(opt)} value={resolvePrimaryKey(opt)}> {opt.name || opt.username || opt.description} 
                                        </option> 
                                    ))} 
                                </select>
                            </td>
                        </tr> 	
                    <tr className="submit-container">
                        <td><button className="submit" type="submit">Submit</button></td>
                        <td><button className="submit" onClick={cancelClicked}>Cancel</button></td>
                    </tr>
                </tbody>
		     </table>
		    </form>
	    </div>
    );
}
