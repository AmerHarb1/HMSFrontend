import  {AddTable } from '../components/AddTable';

export function CostCenterInventory() {
  return (
    <div >  	
        <AddTable name= "Cost Center Inventory" 
                  lnk="costCenterInventory"
                  excludeFields={{id: '', createdBy: '', createdDate: '', accountTypeSubType: ''}}
                  entryView = "view"
                  modifyView = "view"
        />
    </div>
  );
}