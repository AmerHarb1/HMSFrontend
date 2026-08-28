import  {Search } from '../components/Search';

export function OutPatientXrayOrderNoRequestSearch() {
  return (
      <div >  	
            <Search name= "Patient Search" 
                    lnk="patientSearch"                         //search link
                    searchLink="outPatientXrayOrderNoRequest"   //page to go to after selecting a record from search results
                    formTabLink="doctorVisitPatient"
                    detail='Detail'
                    masterLink="xrayRequest"
                    detailLink="xrayResultByRequest"
                    detailSubmitLink="xrayResultSubmitByRequest"
                    masterSubmitButton="Send To Machine"
                    updateLink="xrayRequest"
                    formTabEntity="patient"
                    searchFields = {['PatientId','FirstName', 'LastName', 'BithDate', 'SSN']}
                    searchValues = {{PatientId: '', FirstName: '', LastName: '', BirthDate: '', SSN: ''}}
                    disabledFields={{ patient:''
                                    , patientId:''
                                    , comments:''
                                    , product:''
                                    , id:''
                                    , doctorVisitOrderId:''
                                    , requestDate:''
                                  }}
                    excludeFields={{  createdBy: ''
                                    , createdDate: ''
                                    , inPatientOrderId: ''
                                  }}
            />
      </div>
  );
}