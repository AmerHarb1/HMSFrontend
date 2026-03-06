import  {AddTable } from '../components/AddTable';

export function Vendor() {
  return (
    <div >  	
        <AddTable name= "Vendor" 
                  lnk="vendor"
                  excludeFields={{id: '', createdBy: '', createdDate: '', accountTypeSubType: ''}}
        />
    </div>
  );
}