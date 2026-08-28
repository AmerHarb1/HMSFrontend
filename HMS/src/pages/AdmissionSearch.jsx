import  {Search } from '../components/Search';

export function AdmissionSearch() {
  return (
    <div >  	
            <Search name= "Patient Search" 
                    lnk="patientSearch"
                    searchLink="admission"
                    formTabLink="admissionByRequest"
                    formTabEntity="patient"
                    searchFields = {['PatientId','FirstName', 'LastName', 'BithDate', 'SSN']}
                    searchValues = {{PatientId: '', FirstName: '', LastName: '', BirthDate: '', SSN: ''}}
                    //disabledFields={['patient','medicalSpecialty','medicalSubSpecialty','admissionType']}
                    disabledFields={{patient:'',medicalSpecialty:'',medicalSubSpecialty:'',admissionType:''}}
                    excludeFields={{ createdBy: '', createdDate: '',admissionRequest: '', requestDate: '',source: '', sourceId: ''}}
                    tableExcludeFields={{ createdBy: ''
                                        , createdDate: ''
                                        , admissionStatus: ''
                                        , admDate: ''
                                        , dischargeDate: ''
                                        , paymentType: ''
                                        , insuranceCompany: ''
                                        , insurancePlan: ''
                                        , insuranceNumber: ''
                                        , insuranceGroup: ''
                                        , building: ''
                                        , floor: ''
                                        , ward: ''
                                        , room: ''
                                        , bed: ''}}
            />
        </div>
  );
}