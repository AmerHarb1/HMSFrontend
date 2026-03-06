import  {AddTable } from '../components/AddTable';

export function TransactionDetail() {
  return (
    <div >  	
        <AddTable name= "Transaction Detail" 
                  lnk="transactionDetail"
                  excludeFields={{id: '', createdBy: '', createdDate: '', accountTypeSubType: ''}}
        />
    </div>
  );
}