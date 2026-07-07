import { Button } from 'antd';
import { useNavigate, useLocation} from 'react-router';
import '../styles/page.css';
import  {Master } from '../components/Master';

export function AddButton(props){
	const tabData = props.bodyData;
	const page = props.page;
	const backLink = props.backLink;
	const backId = props.backId;
	const masterId = props.masterId?props.masterId:props.detailId;
	const masterFields=props.masterFields;
	const masterCode=props.masterCode;
	const masterCodeValue=props.masterCodeValue;
	const excludeFields = props.excludeFields;
	const serviceFormData=props.serviceFormData;
	const detailExcludeFields = props.detailExcludeFields;
	const detail = props.detail;	
	const disabledFields = props.disabledFields;
    const masterDefaultValues = props.masterDefaultValues?props.masterDefaultValues:{};    
	const safeMasterDefaultValues = JSON.parse(JSON.stringify(masterDefaultValues ?? {}));
	const localLovMapRef = props.masterLocalLovMap;
	const entryView = props.entryView;
	const updateMaster = props.updateMaster;
	const detailLink = props.detailLink;
	const detailChild = props.detailChild;
    const forwardKey = props.forwardKey;
	const title = props.title;
	const formTabLink = props.formTabLink;
	const formTabEntity = props.formTabEntity;
	const formTabId = props.formTabId;
   
	const location = useLocation();
	const navigate = useNavigate();

	const buttonClicked = () => {		
		let keys = [];
		if (tabData !== null && Array.isArray(tabData) && tabData.length > 0) {
			keys = Object.keys(tabData[0]);
		}else{
			keys = masterFields;
		}

		const returnMode = location.state?.returnMode ?? props.parentState?.returnMode;
		const returnField = location.state?.returnField ?? props.parentState?.returnField;

		if (returnMode) {
			// Return selected record back to previous screen
			navigate("/appointment", {
				state: {
					selectedRecord: props.rec,
					returnField: returnField
				}
			});
			return;
		}

		console.log(props.actionLink)
		navigate('/'+props.actionLink
				,{state:{
					initialData:tabData,
					tabData:keys,						
					page:page,
					lnk:props.lnk,
					rec:props.rec,
					excludeFields:excludeFields,
					detailExcludeFields:detailExcludeFields,
					name:props.name,
					serviceFormData:serviceFormData,
					backLink:backLink,
					masterId:masterId,
					backId:masterId,
					masterFields:masterFields,
					masterCode:masterCode,
					masterCodeValue:masterCodeValue,
					detail: detail,
					disabledFields:disabledFields,
					detailLink:detailLink,
					entryView:entryView,
					updateMaster:updateMaster,
					detailChild:detailChild,
					serviceFormDate:props.serviceFormDate,
					createdBy:props.createdBy,
					createdOn:props.createdOn,
					title:title,
					forwardKey:forwardKey,
					masterDefaultValues:safeMasterDefaultValues,
					masterLocalLovMap:localLovMapRef,
					formTabLink:formTabLink,
					formTabEntity:formTabEntity,
					formTabId:formTabId
				}
			});
		
    };

	return (
		<div>
            <Button className={props.class} type={props.btn_type} onClick={buttonClicked} icon={props.icon}> {props.name}</Button>
		</div>
		);
}