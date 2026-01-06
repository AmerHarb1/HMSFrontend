import { Button } from 'antd';
import {useNavigate} from 'react-router';
import '../styles/page.css';

export function AddButton(props){
	const tabData = props.bodyData;
	const page = props.page;
	const backLink = props.backLink;
	const backId = props.backId;
	const masterData=props.masterData;
	const excludeFields = props.excludeFields;
	const serviceFormData=props.serviceFormData;
	const navigate = useNavigate();
//console.log(props.recId);
	const buttonClicked = () => {		
		let keys = [];
		if (tabData !== null && Array.isArray(tabData) && tabData.length > 0) {
			keys = Object.keys(tabData[0]);
		}
			navigate('/'+props.actionLink
					,{state:{
						tabData:keys,
						initialData:tabData,
						page:page,
						lnk:props.lnk,
						rec:props.rec,
						excludeFields:excludeFields,
						name:props.name,
						serviceFormData:serviceFormData,
						backLink:backLink,
						backId:backId,
						masterData:masterData,
						serviceFormDate:props.serviceFormDate,
						createdBy:props.createdBy,
						createdOn:props.createdOn}
					});
    };

	return (
		<div>
            <Button className={props.class} type={props.btn_type} onClick={buttonClicked} icon={props.icon}> {props.name}</Button>
		</div>
		);
}