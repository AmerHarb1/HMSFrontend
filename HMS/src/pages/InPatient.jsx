import  {Search } from '../components/Search';

export function InPatient() {
  return (
    <div >  	
        <Search name= "Patient Search" 
                lnk="patientSearch"
                searchLink="inPatientTabs"
                formTabLink="inPatient"
                formTabEntity="patient"
                searchFields = {['PatientId','FirstName', 'LastName', 'BithDate', 'SSN']}
                searchValues = {{PatientId: '', FirstName: '', LastName: '', BirthDate: '', SSN: ''}}
                disabledFields={'patient'}
                excludeFields={{ createdBy: '', createdDate: ''}}
        />
    </div>
  );
}