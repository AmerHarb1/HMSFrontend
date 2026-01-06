import  {AddTable } from '../components/AddTable';

export function Service() {
  return (
    <div >  	
        <AddTable name= "Service" lnk="service" excludeFields={{id: '', createdBy: '', createdDate: '', itemNumber: ''}}/>
    </div>
  );
}