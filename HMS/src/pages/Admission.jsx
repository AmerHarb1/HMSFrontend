import  {AddTable } from '../components/AddTable';
import { useLocation} from 'react-router';

export function Admission() {
  const location = useLocation();
  const state = location.state || {};
  const lnkId = state?state.lnkId:0;
  const excludeFields = state.excludeFields ?? {
    createdBy: '',
    createdDate: '',
    admissionRequest: '',
    requestDate: '',
    source: '',
    sourceId: ''
  };
  const tableExcludeFields = state.tableExcludeFields??{createdBy: '',
    createdDate: '',
    admissionRequest: '',
    requestDate: '',
    source: '',
    sourceId: '',
    medicalSpecialty:'',
    medicalSubSpecialty:''
  };
  const disabledFields = state.disabledFields??{patient:'',medicalSpecialty:'',medicalSubSpecialty:'',admissionType:''};
  //console.log(excludeFields)
  return (
    <div >  	
        <AddTable name= "Admission" 
                  lnk="admission" 
                  lnkId={lnkId} 
                  excludeFields={excludeFields} 
                  tableExcludeFields={tableExcludeFields} 
                  disabledFields={disabledFields}/>
    </div>
  );
}