import  {AddTable } from '../components/AddTable';

export function QuotationResponse() {
  return (
    <div >  	
        <AddTable name= "Quotation Response" 
                  lnk="quotationResponse" 
                  detailLink="productIssuance"
                  backLink="back" 
                  detail=""
                  detailChild="quotationResponse"
                  forwardKey="quotationResponseId"
                  excludeFields={{id: '', createdBy: ''
                                , createdDate: ''
                                , materialRequestStatus: ''
                                , productRequestPriority: ''
                                , approvedDate: ''
                                , requestedDate: ''
                                , requester: ''
                                , approver: ''
                                , approveQuotationResponseStatus: ''
                                , responseDate: ''}}
                  detailExcludeFields={{id: '', createdBy: '', createdDate: ''}}
                  disabledFields={{quotationRequestId: '', productCode: '', vendor: '', requestDate: '', requestedQuantity: '', requestUnitOfMeasure: ''}}
                  entryView = "view"/>
    </div>
  );
}