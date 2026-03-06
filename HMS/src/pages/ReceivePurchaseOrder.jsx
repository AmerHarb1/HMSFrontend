import  {AddTable } from '../components/AddTable';

export function ReceivePurchaseOrder() {
  return (
    <div >  	
        <AddTable name= "Receive Purchase Order" 
                  lnk="receivePurchaseOrder" 
                  excludeFields={{id: '', createdBy: '', createdDate: '', receiveDate: ''}}
                  tableExcludeFields={{createdBy: '', createdDate: '', receiveDate: '', comments: ''}}
                  disabledFields={{purchaseOrderId: '', productCode: '', supplier: '', orderDate: '', orderQuantity: '', orderUnitOfMeasure: '', orderPrice: ''}}
                  entryView = "view"
        />
    </div>
  );
}