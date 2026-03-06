import  {AddTable } from '../components/AddTable';

export function ApproveMaterialRequest() {
  return (    
    <div >  	
        <AddTable name= "Approve Material Request" 
                  lnk="approveMaterialRequest"
                  detailLink="materialRequestDetail"
                  backLink="back" 
                  detail="Detail"
                  forwardKey="materialRequestId"
                  excludeFields={{id: '', createdBy: '', createdDate: '', materialRequestStatus: '', productRequestPriority: '', approvedDate: '', requestedDate: '', requester: '', approver: '', purpose: '', costCenter: '', productIssueStatus: ''}}
                  detailExcludeFields={{id: '', createdBy: '', createdDate: ''}}
                  disabledFields={{materialRequestId: '', productType: '', productDivision: '', productGroup: '', productCategory: '', itemNumber: '', quantity: ''}}
                  entryView = "view"/>
    </div>
  );
}