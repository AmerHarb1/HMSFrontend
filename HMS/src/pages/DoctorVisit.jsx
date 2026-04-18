import  {Search } from '../components/Search';

export function DoctorVisit() {
  return (
    <div >  	
        <Search name= "Patient Search" 
                lnk="patientSearch"
                searchLink="doctorVisitTabs"
                formTabLink="doctorVisitPatient"
                formTabEntity="patient"
                searchFields = {['PatientId','FirstName', 'LastName', 'BithDate']}
                searchValues = {{PatientId: '', FirstName: '', LastName: '', BirthDate: ''}}
                disabledFields={'patient'}
                excludeFields={{ createdBy: '', createdDate: ''}}
        />
    </div>
  );
}