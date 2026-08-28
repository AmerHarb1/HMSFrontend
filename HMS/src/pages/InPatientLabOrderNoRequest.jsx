import  {AddTable } from '../components/AddTable';
import { useLocation} from 'react-router';

export function InPatientLabOrderNoRequest() {
  const location = useLocation();
  const state = location.state || {};
  const lnkId = state?state.lnkId:0;
  const detailSubmitLink = state?state.detailSubmitLink:null;        //used to optionaly add a submit functionality in the masterDetail
  const masterSubmitButton = state?state.masterSubmitButton:null;    //used to set the text in the submit button

  const excludeFields = state.excludeFields ?? {
                                                createdBy: ''
                                              , createdDate: ''
                                              , doctorVisitOrderId: ''
                                              };
  const disabledFields = state.disabledFields??{patient:'',product:'',id:''};

  return (
    <div >  	
        <AddTable name= "In Patient Lab Order No Request" 
                  lnk="inPatientLabOrderNoRequest" 
                  lnkId={lnkId}
                  detail='Detail'
                  masterLink="labRequest"
                  detailLink="labResultByOutOrder"
                  updateLink="labRequest"
                  entryView = "view"
                  detailSubmitLink={detailSubmitLink}
                  masterSubmitButton={masterSubmitButton}
                  detailSubmitButton="Send To Machine"
                  excludeFields={excludeFields}
                  disabledFields={disabledFields}
                  updateMaster='Yes'
                />
    </div>
  );
}