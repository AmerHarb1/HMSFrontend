import  {Search } from '../components/Search';
import { DrugConsumptionFrequency } from './DrugConsumptionFrequency';

export function PatientMedicationSearch() {
  return (
    <div >
        <Search name= "Patient Search" 
                lnk="patientSearch"              //search link
                searchLink="patientMedication"   //page to go to after selecting a record from search results
                formTabLink="patientMedication"
                detailLink="patientMedicationDetail"
                searchFields = {['PatientId','FirstName', 'LastName', 'BithDate', 'SSN']}
                searchValues = {{PatientId: '', FirstName: '', LastName: '', BirthDate: '', SSN: ''}}
                disabledFields={{ patient:''
                                , patientId:''
                                , comments:''
                                , id:''
                                , requestDate:''
                                , drugConsumptionRoute: ''
                              }}
                excludeFields={{  createdBy: ''
                                , createdDate: ''
                              }}
        />
    </div>
  );
}