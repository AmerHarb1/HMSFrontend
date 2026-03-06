import  {AddTable } from '../components/AddTable';

export function VendorPayment() {
  return (
    <div >  	
        <AddTable name= "Vendor Payment" 
                  lnk="vendorPayment"
                  excludeFields={{id: '', createdBy: '', createdDate: '', accountTypeSubType: ''}}
        />
    </div>
  );
}