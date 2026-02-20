import  {AddTable } from '../components/AddTable';

export function MaterialRequest() {
  return (    
    <div >  	
        <AddTable name= "Material Request" 
                  lnk="materialRequest"
                  backLink="back" 
                  detail="Detail"
                  forwardKey="materialRequestId"
                  excludeFields={{id: '', createdBy: '', createdDate: '', productRequestApproval: '', requestedDate: '', requester: '', approver: '', costCenter: '', approvedDate: '', productIssueStatus: ''}}
                  detailExcludeFields={{id: '', createdBy: '', createdDate: ''}}
                  masterFields = {['id','materialRequestStatus', 'productRequestPriority', 'productRequestApproval', 'requestedDate', 'purpose']}
                  masterDefaultValues = {{id: '', materialRequestStatus: '\x1F', productRequestPriority: '\x1F', productRequestApproval: '\x1F', requestedDate: '', purpose: ''}}/>
    </div>
  );
}