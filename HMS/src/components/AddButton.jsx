import { Button } from 'antd';
import {useNavigate} from 'react-router';
import '../styles/page.css';

export function AddButton(props){
	const tabData = props.bodyData;
	const page = props.page;
	const navigate = useNavigate();
//	console.log(props.btn_type);
	const buttonClicked = () => {
	//	console.log(tabData[0]);
    	navigate('/'+props.actionLink,{state:{tabData:Object.keys(tabData[0]),initialData:tabData,page:page,lnk:props.lnk,recId:props.recId,createdBy:props.createdBy,createdOn:props.createdOn}});
    };
	return (
		<div>
            <Button className={props.class} type={props.btn_type} onClick={buttonClicked} icon={props.icon}> {props.name}</Button>
		</div>
		);
}