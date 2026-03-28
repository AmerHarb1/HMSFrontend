import  {AddTable } from '../components/AddTable';

export function ReceiveMaterialRequest() {
  return (
    <div >  	
        <AddTable name= "Receive Material Request" 
                  lnk="receiveMaterialRequest" 
                  disabledFields={{materialRequestId: '', productType: '', productDivision: '', productGroup: '', productCategory: '', itemNumber: '', quantity: '', productIssueId: ''}}
                  entryView = "view"/>
    </div>
  );
}