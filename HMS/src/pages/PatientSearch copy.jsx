import  {Search } from '../components/Search';

export function PatientSearch() {
  return (
    <div >  	
        <Search name= "Patient Search" 
                lnk="patientSearch"
                searchLink="doctorVisit"
                searchFields = {['PatientId','FirstName', 'LastName', 'BithDate']}
                searchValues = {{PatientId: '', FirstName: '', LastName: '', BirthDate: ''}}
        />
    </div>
  );
}