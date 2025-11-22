import { Table, Typography, Space, Modal, Form, Button, Input} from 'antd';
import axios from 'axios';
import { useState} from 'react';
import { useNavigate} from 'react-router';
import {useLocation} from 'react-router';
import '../styles/page.css';

export function ModifyForm(props){
    const { state } = useLocation();
    let accessToken = useState(JSON.parse(localStorage.getItem('accessKey')));
    let amer = accessToken.indexOf(",function ()")
    accessToken = accessToken.slice(0,amer);

    const [formData, setFormData] = useState(state.tabData.reduce((a, v) => ({ ...a, [v]: ""}), {})); 
    const getRowIndexById = (id) => {
	  return state.initialData.findIndex((row) => row.id === id);
	};
    const apiLnk ='http://localhost:9002/hms/' +state.lnk+'/'+state.recId;
    const createdBy = state.createdBy;
  	const createdOn = state.createdOn;
    const comments = state.comments;
    const recId = state.recId;
	const tabIndex = getRowIndexById(recId);
	const initialData = Object.values(state.initialData[tabIndex]); 
    const tabData = state?state.tabData:props.obj;
    const formName =state?state.page:props.name;
    const lnk =state?state.lnk:props.lnk;
    const stringIn={id:"",createdBy:"",createdOn:""};
    const navigate = useNavigate();
 
    
    const headers = {'Content-Type': 'application/json', 'Authorization':'Bearer ' + accessToken,'Access-Control-Allow-Origin': 'http://localhost:5173',withCredentials: true};

    const cancelClicked = () => {
        navigate('/'+lnk);  											
    };

    const handleChange = (event) => {
    	const { name, value } = event.target;
    	//alert(value);
    	setFormData((prevFormData) => ({  ...prevFormData,[name]: value }));   
  	};
    
    const updateClicked = (event) => {
  		event.preventDefault();
  		
		const obj = tabData.reduce((o, key) => ({ ...o, [key]: key=="id"?recId
														:key=="createdBy"?createdBy
														:key=="createdon"?createdOn
                                                        :key=="comments"?comments
														: formData[key]==''?initialData[tabData.indexOf(key)]:formData[key]}), {})//Object.assign({}, ...Object.entries({...formObj}).map(([a,b]) => ({ [b]: formData[b] })))
		console.log(lnk);	
        console.log(apiLnk);											
	  	axios.put(apiLnk,obj,{headers: headers}
  				).then(res => {navigate('/'+lnk);})
  				  .catch((error) => {console.warn("response", error.response?.data)});
	};
	
	const deleteClicked = (event) => {
  		event.preventDefault();
  		var answer = window.confirm("Are you sure you want to Delete data?");
    	if (answer) {
		  // Save it!
		  console.log('Thing was saved to the database.');
		} else {
		  // Do nothing!
		  console.log('Thing was not saved to the database.');
		}		
	  	axios.delete(apiLnk,{headers: headers}
  				).then(res => {navigate('/'+lnk);})
  				  .catch((error) => {console.warn("response", error.response?.data)});
	};
    
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
                            Object.keys(tabData).map(s=> 
                                tabData[s] in stringIn
                                    ?
                                        null
                                    :
                                        <tr>					  	
                                            <td><label htmlFor="name">{tabData[s]}:</label></td>
                                            <td key={tabData[s]}><input type="text"  id={tabData[s]} defaultValue={initialData[s]} name={tabData[s]} value={formData?formData[s]:null} onChange={handleChange}/></td>
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