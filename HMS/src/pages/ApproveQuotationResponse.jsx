import  {AddTable } from '../components/AddTable';

export function ApproveQuotationResponse() {
  return (    
    <div >  	
        <AddTable name= "Approve Quotation Response" 
                  lnk="approveQuotationResponse"
                  detailLink="quotationResponse"
                  backLink="back" 
                  detail=""
                  forwardKey="quotationResponseId"
                  excludeFields={{id: ''
                                , createdBy: ''
                                , createdDate: ''
                                , materialRequestStatus: ''
                                , productRequestPriority: ''
                                , approvedDate: ''
                                , requestedDate: ''
                                , requester: ''
                                , approver: ''
                                , purpose: ''
                                , productCode: ''
                                , productIssueStatus: ''}}
                  detailExcludeFields={{id: '', createdBy: '', createdDate: ''}}
                  disabledFields={{ quotationRequestId: ''
                                  , productCode: ''
                                  , requestDate: ''
                                  , productGroup: ''
                                  , vendor: ''
                                  , quotationResponseStatus: ''
                                  , requestUnitOfMeasure: ''
                                  , requestedQuantity: ''
                                  , responseDate: ''
                                  , responseUnitOfMeasure: ''
                                  , responseQuantity: ''
                                  , price: ''}}
                  entryView = "view"
                  updateMaster = "no"/>
    </div>
  );
}