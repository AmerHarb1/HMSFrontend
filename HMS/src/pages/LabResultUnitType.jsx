import  {AddTable } from '../components/AddTable';

export function LabResultUnitType() {
  return (
    <div >  	
        <AddTable name= "Lab Result Unit Type" 
                  lnk="labResultUnitType" 
                  excludeFields={{  createdBy: ''
                                    , createdDate: ''
                                  }}/>
    </div>
  );
}