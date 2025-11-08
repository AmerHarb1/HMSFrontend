import axios from 'axios';
import {React,useEffect,useState} from 'react';
import { useNavigate} from 'react-router';

export function RegisterForm({fromName, dataObj, lnk}){
    const [formData, setFormData] = useState(dataObj);
  	const [data, setData] = useState(null);
  	const [accessToken, setAccessToken] = useState([]);
    const tabData = dataObj;
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
		axios.post(lnk,obj,{headers: headers}
  			).then(res => {
				    setData(res.data);    //token
				    localStorage.setItem('accessKey', JSON.stringify(data));
				    setAccessToken(data);
                    onLoginSuccess();
				  navigate('/');
				  })
			  .catch((error) => {console.warn("response", error.response?.data)});		
	};
	
	useEffect(() => {
	  localStorage.setItem('accessKey', JSON.stringify(data));
	}, [accessToken]);

    return(
        <div className="form-table"> 
            <h1>{fromName}</h1>	  
            <form onSubmit={handleSubmit}>
                <table >
                    <tbody>                        
                        <tr>					  	
                            <td><label htmlFor="Id">Id:</label></td>
                            <td key="id"><input type="text"  id="id" name="id"  onChange={handleChange}/></td>
                        </tr>                         
                        <tr>					  	
                            <td><label htmlFor="name">User Name:</label></td>
                            <td key="username"><input type="text"  id="username" name="username"  onChange={handleChange}/></td>
                        </tr> 				  	
                        <tr>					  	
                            <td><label htmlFor="name">Password:</label></td>
                            <td key="password"><input type="text"  id="password" name="password"  onChange={handleChange}/></td>
                        </tr>
                        <tr>					  	
                            <td><label htmlFor="role">Role:</label></td>
                            <td key="role"><input type="text"  id="role" name="role"  onChange={handleChange}/></td>
                        </tr>  	
                    <tr>
                    <td><button className="form-button" type="submit">Submit</button></td>
                    <td><button className="form-button" onClick={cancelClicked}>Cancel</button></td>
                    </tr>
                </tbody>
		     </table>
		    </form>
	    </div>
    );
}