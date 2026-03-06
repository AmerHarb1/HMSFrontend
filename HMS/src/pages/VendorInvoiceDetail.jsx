import  {AddTable } from '../components/AddTable';

export function VendorInvoiceDetail() {
  return (
    <div >  	
        <AddTable name= "Vendor Invoice Detail" 
                  lnk="vendorInvoiceDetail"
                  excludeFields={{id: '', createdBy: '', createdDate: '', accountTypeSubType: ''}}
        />
    </div>
  );
}