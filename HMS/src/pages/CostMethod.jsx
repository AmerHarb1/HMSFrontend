import  {AddTable } from '../components/AddTable';

export function CostMethod() {
  return (
    <div >  	
        <AddTable name= "Costing Method" 
                  lnk="costMethod"
                  excludeFields={{id: '', createdBy: '', createdDate: '', accountTypeSubType: ''}}
        />
    </div>
  );
}