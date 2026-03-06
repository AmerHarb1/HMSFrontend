import  {AddTable } from '../components/AddTable';

export function Transaction() {
  return (
    <div >  	
        <AddTable name= "Transaction" 
                  lnk="transaction"
                  excludeFields={{id: '', createdBy: '', createdDate: '', accountTypeSubType: ''}}
        />
    </div>
  );
}