import  {AddTable } from '../components/AddTable';

export function TransactionType() {
  return (
    <div >  	
        <AddTable name= "Transaction Type" 
                  lnk="transactionType"
                  excludeFields={{id: '', createdBy: '', createdDate: '', accountTypeSubType: ''}}
        />
    </div>
  );
}