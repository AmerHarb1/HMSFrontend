import  {Search } from '../components/Search';

export function InPatient() {
  return (
    <div >  	
        <Search name= "Patient Search" 
                lnk="inPatientSearch"
                searchLink="inPatientTabs"
                formTabLink="admissionByPatient"
                formTabEntity="patient"
                searchFields = {['PatientId','FirstName', 'LastName', 'BithDate', 'SSN']}
                searchValues = {{PatientId: '', FirstName: '', LastName: '', BirthDate: '', SSN: ''}}
                disabledFields={{ patient:''
                                , patientId:''
                                , personId:''
                                , building: ''
                                , floor: ''
                                , ward: ''
                                , room: ''
                                , bed: ''
                                , id: ''
                                , admDate:''
                                , paymentType:''
                                , insuranceCompany:''
                                , insurancePlan:''
                                , comments:''
                              }}
                excludeFields={{  createdBy: ''
                                , createdDate: ''
                                , admissionStatus: ''
                                , dischargeDate: ''
                                , insuranceNumber: ''
                                , insuranceGroup: ''
                                , admissionRequest: ''
                                , requestDate: ''
                                , source: ''
                                , sourceId: ''
                                , medicalSpecialty:''
                                , medicalSubSpecialty:''
                                , admissionType:''
                                , doctor:''
                              }}
        />
    </div>
  );
}