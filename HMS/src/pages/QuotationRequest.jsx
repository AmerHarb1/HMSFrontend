import  {AddTable } from '../components/AddTable';

export function QuotationRequest() {
  return (
    <div >  	
        <AddTable name= "Quotation Request" 
                  lnk="quotationRequest" 
                  detailLink="productIssuance"
                  backLink="back" 
                  detail=""
                  detailChild="quotationRequest"
                  forwardKey="quotationRequestId"
                  excludeFields={{id: '', createdBy: '', createdDate: '', materialRequestStatus: '', productRequestPriority: '', approvedDate: '', requestedDate: '', requester: '', approver: '', purpose: '', costCenter: '', productRequestApproval: '', issuer: '', issuedDate: ''}}
                  detailExcludeFields={{id: '', createdBy: '', createdDate: ''}}
                  disabledFields={{productIssuanceId: '', productCode: '', supplier: '', requestedQuantity: '', issuedQuantity: ''}}
                  entryView = "view"/>
    </div>
  );
}