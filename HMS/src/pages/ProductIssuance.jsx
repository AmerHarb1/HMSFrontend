import  {AddTable } from '../components/AddTable';

export function ProductIssuance() {
  return (
    <div >  	
        <AddTable name= "Product Issuance" 
                  lnk="productIssuance"
                  detailLink="materialRequestDetail"
                  backLink="back" 
                  detail="Detail"
                  detailChild="productIssuance"
                  forwardKey="materialRequestId"
                  excludeFields={{id: '', createdBy: '', createdDate: '', materialRequestStatus: '', productRequestPriority: '', approvedDate: '', requestedDate: '', requester: '', approver: '', purpose: '', costCenter: '', productRequestApproval: '', issuer: '', issuedDate: ''}}
                  detailExcludeFields={{id: '', createdBy: '', createdDate: ''}}
                  disabledFields={{materialRequestDetailId: '', productCode: '', requestedQuantity: ''}}
                  entryView = "view"/>
    </div>
  );
}