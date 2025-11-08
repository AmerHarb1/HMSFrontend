import axios from 'axios';
import {React,useEffect,useState} from 'react';
import { useNavigate} from 'react-router';
import { FaUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { GetUserMenu } from '../functions/GetUserMenu';
import '../styles/login.css';

export function Register({ onLoginSuccess, populateUserMenu }){
    const fields = ['username','password'];
	const link = 'http://localhost:9002/hms/login';
    const [formData, setFormData] = useState(fields);
    const [accessToken, setAccessToken] = useState([]);
    const tabData = fields;
    const headers = {'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:9002/hms/login',withCredentials: true };
    const navigate = useNavigate();

    const cancelClicked = () => {
    	navigate('/');  											
	};

    const handleChange = (event) => {
    	const { name, value } = event.target;
    	//alert(value);
    	setFormData((prevFormData) => ({  ...prevFormData,[name]: value }));   
  	};

    const handleSubmit = (event) => {
  		event.preventDefault();
  		const obj = tabData.reduce((o, key) => ({ ...o, [key]: formData[key]}), {})//create obj array that has key value pairs of formData for only keys found in tabData
		axios.post(link,obj,{headers: headers}
  			).then(res => {   
                    console.log(res.data);//token
				    localStorage.setItem('accessKey', JSON.stringify(res.data));
				    setAccessToken(res.data);
                    onLoginSuccess();    
                    console.log('after receiving response from get token ' + obj.username + '  ' + res.data.menuStructure + '  ' + res.data.token);                
                    populateUserMenu(res.data.menuStructure);                   
                    
				  navigate('/');
				  })
			  .catch((error) => {console.warn("response", error.response?.data)});		
	};
	

/*
	useEffect(() => {
	  localStorage.setItem('accessKey', JSON.stringify(accessToken));
	}, [accessToken]);
*/

    return(
        <div className="container">            	  
            <form onSubmit={handleSubmit} className="header">
                <div className="text">Login</div>
                <table >
                    <tbody className="inputs">                                               
                        <tr className="input">	
                            <FaUser className="icon-img"/>				  	
                            <td key="username"><input type="text"  id="username" name="username" placeholder='username' onChange={handleChange}/></td>
                        </tr> 				  	
                        <tr className="input">
                            <TbLockPassword className="icon-img"/>
                            <td key="password"><input type="password"  id="password" name="password" placeholder='password' onChange={handleChange}/></td>
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
