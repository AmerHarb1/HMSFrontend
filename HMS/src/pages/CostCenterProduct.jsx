import  {AddTable } from '../components/AddTable';

export function CostCenterProduct() {
  return (
    <div >  	
        <AddTable name= "Cost Center Product" 
                  lnk="costCenterProduct"
                  excludeFields={{id: '', createdBy: '', createdDate: '', accountTypeSubType: ''}}
                  entryView = "view"
                  modifyView = "view"
        />
    </div>
  );
}