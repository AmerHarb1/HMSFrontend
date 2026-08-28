import  {Search } from '../components/Search';

export function InPatientXrayOrderNoRequestSearch() {
  return (
      <div >  	
            <Search name= "Patient Search" 
                    lnk="inPatientSearch"
                    searchLink="InPatientXrayOrderNoRequest"
                    formTabLink="admissionByPatient"
                    formTabEntity="patient"
                    detail='Detail'
                    masterLink="xrayRequest"
                    detailLink="xrayResultByRequest"
                    detailSubmitLink="xrayResultSubmitByRequest"
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