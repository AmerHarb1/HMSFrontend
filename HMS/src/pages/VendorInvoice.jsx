import  {AddTable } from '../components/AddTable';

export function VendorInvoice() {
  return (
    <div >  	
        <AddTable name= "Vendor Invoice" 
                  lnk="vendorInvoice"
                  excludeFields={{id: '', createdBy: '', createdDate: '', accountTypeSubType: ''}}
        />
    </div>
  );
}