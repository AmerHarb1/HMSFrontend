import  {AddTable } from '../components/AddTable';

export function Item() {
  return (
    <div >  	
        <AddTable name= "Item" lnk="item" excludeFields={{id: '', createdBy: '', createdDate: '', itemNumber: ''}}/>
    </div>
  );
}