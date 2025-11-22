import { Table, Typography, Space, Modal, Form, Button, Input} from 'antd';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { useNavigate} from 'react-router';
import {useLocation} from 'react-router';
import '../styles/page.css';

export function AddForm(props){
//    console.log('in Add table' +props.name);
//    console.log(props.lnk);
    const { state } = useLocation();
    let accessToken = useState(JSON.parse(localStorage.getItem('accessKey')));
    let amer = accessToken.indexOf(",function ()")
    accessToken = accessToken.slice(0,amer);
//    console.log('Token = ' + accessToken);
	const [formData, setFormData] = useState(state?state.tabData.reduce((a, v) => ({ ...a, [v]: ""}), {}):props.obj);
  	const tabData = state?state.tabData:props.obj;
    const tabDataValues = state?state.initialData:props.obj;
  	const formName =state?state.page:props.name;
  	const lnk =state?state.lnk:props.lnk;
  	const stringIn={id:"",createdBy:"",createdOn:""};
	const navigate = useNavigate();
    const linkLov = 'http://localhost:9002/hms/';
    const [lovMap, setLovMap] = useState(new Map());
    const [parentChildLovMap, setParentChildLovMap] = useState(new Map());
    const link = 'http://localhost:9002/hms/' + lnk
 
    
    const headers = {'Content-Type': 'application/json', 'Authorization':'Bearer ' + accessToken,withCredentials: true}
	const cancelClicked = () => {
    //    console.log(lnk);
    	navigate('/'+lnk);  											
	};
	
  	const handleChange = (event) => {
    	const { name, value } = event.target;
    	setFormData((prevFormData) => ({  ...prevFormData,[name]: value }));   
  	};

    const handleLovChange = (event) => {
    	const { name, value } = event.target;   //name is the field 
    	setFormData((prevFormData) => ({  ...prevFormData,[name]: value })); 
        if(parentChildLovMap.has(name)) {
           console.log("Found:", parentChildLovMap.get(name)); // "Found: Amer" 
           const childKey = parentChildLovMap.get(name);
           axios.get(linkLov+childKey+'Lov',{headers: headers}  //get Lov data from api
	  				).then(res => {                        
                            setLovMap(prev => new Map(prev).set(childKey, res.data));    //add Lov to lovMap
                            setFormData(prev => ({ ...prev, [childKey]: "" })); // reset child value
						  })
	  				  .catch((error) => {console.warn("response", error.response?.data)});
        }
        
        //when parent changes, reset child
    //    setLovMap(prev => new Map(prev).set('child', [{id:1,name:'amer'},{id:2,name:'zoom'}]));
       
  	};

  	const handleSubmit = (event) => {
  	event.preventDefault();
    	//alert(`Name: ${formData.scriptName} Group: ${formData.groupName}`);
     console.log(lnk);	
		const obj = tabData.reduce((o, key) => ({ ...o, [key]: formData[key]}), {})//Object.assign({}, ...Object.entries({...formObj}).map(([a,b]) => ({ [b]: formData[b] })))
	  	console.log(obj);		
		axios.post(link,obj,{headers: headers}
  				).then(() => {
					  navigate('/'+lnk);
					  })
  				  .catch((error) => {console.warn("response", error.response?.data)});
	};
	
    const getLovData = () => {
//	  	console.log(tabDataValues[0]);
		const cols = Object.keys(tabDataValues[0])
		    .filter((key) => typeof tabDataValues[0][key] === "string" && tabDataValues[0][key].includes(String.fromCharCode(31))); //filter fields that their name includes ascii char 31, they are the Lov fields
//	    	console.log(cols);	            
			cols.forEach((key) => {         //loop through Lov fields
                const value = tabDataValues[0][key];
                let parent = value.substring(value.indexOf(String.fromCharCode(31))+1); 
                console.log(parent.trim());  
                console.log(key); 
                let linkAug = 'Lov';                             
                if (typeof parent === "string" && parent.trim() !== ""){
                    console.log(parent);  
                    setParentChildLovMap(prev => new Map(prev).set(parent,key));     //create map that holds the parent child values.
                    setLovMap(prev => new Map(prev).set(key, []));    //add Lov to lovMap 
                }else{
                    axios.get(linkLov+key+linkAug,{headers: headers}  //get Lov data from api
	  				).then(res => {
                        console.log(res.data);                        
                            setLovMap(prev => new Map(prev).set(key, res.data));    //add Lov to lovMap
						  })
	  				  .catch((error) => {console.warn("response", error.response?.data)});
                }
                
            });			
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
                                                            <option key={opt.id} value={opt.id}>
                                                                {opt.name?opt.name:opt.username}
                                                            </option>
                                                        ))}
                                                        </select>
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