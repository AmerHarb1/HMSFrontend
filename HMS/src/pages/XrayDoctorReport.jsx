import  {AddTable } from '../components/AddTable';

export function XrayDoctorReport() {

  return (
    <div >  	
        <AddTable name= "Xray Doctor Report" 
                  lnk="xrayDoctorReport" 
                  entryView = "view"
                  disabledFields={{ patient:''
                                  , xrayRequestId:''
                                  , xrayTest: ''
                                  , requestDate:''
                                  
                              }}
                excludeFields={{  createdBy: ''
                                , createdDate: ''
                                , doctor: ''
                                , id: ''
                              }}/>
    </div>
  );
}