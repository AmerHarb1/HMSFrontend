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
                                , costCenter: ''
                                , productRequestApproval: ''
                                , issuer: ''
                                , issuedDate: ''
                                , materialRequestId: ''
                                , materialRequestDetailId: ''
                                , productCode: ''
                                , requestedQuantity: ''
                                , productUseType: ''
                              }}
                  detailExcludeFields={{id: '', createdBy: '', createdDate: ''}}
                  disabledFields={{materialRequestDetailId: '', productCode: '', requestedQuantity: ''}}
                  masterDefaultValues = {{id: ''}}
                  entryView = "view"
                  updateMaster="no"
          />
    </div>
  );
}