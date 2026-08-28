import  {Search } from '../components/Search';

export function OutPatientLabOrderNoRequestSearch() {
  return (
      <div >  	
            <Search name= "Patient Search" 
                    lnk="patientSearch"
                    searchLink="outPatientLabOrderNoRequest"
                    formTabLink="doctorVisitPatient"
                    detail='Detail'
                    masterLink="labRequest"
                    detailLink="labResultByRequest"
                    detailSubmitLink="labResultSubmitByRequest"
                    masterSubmitButton="Send To Machine"
                    updateLink="labRequest"
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