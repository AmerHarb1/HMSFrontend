import  {Search } from '../components/Search';

export function InPatientLabOrderNoRequestSearch() {
  return (
      <div >  	
            <Search name= "Patient Search" 
                    lnk="inPatientSearch"
                    searchLink="InPatientLabOrderNoRequest"
                    formTabLink="admissionByPatient"
                    formTabEntity="patient"
                    detail='Detail'
                    masterLink="labRequest"
                    detailLink="labResultByRequest"
                    detailSubmitLink="labResultSubmitByRequest"
                    masterSubmitButton="Save Request"
                    searchFields = {['PatientId','FirstName', 'LastName', 'BithDate', 'SSN']}
                    searchValues = {{PatientId: '', FirstName: '', LastName: '', BirthDate: '', SSN: ''}}
                    disabledFields={{ patient:''
                                    , patientId:''
                                    , comments:''
                                    , product:''
                                    , id:''
                                    , inPatientOrderId:''
                                  }}
                    excludeFields={{  createdBy: ''
                                    , createdDate: ''
                                    , doctorVisitOrderId: ''
                                  }}
            />
      </div>
  );
}