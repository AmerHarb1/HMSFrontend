import  {AddTable } from '../components/AddTable';

export function Drug() {
  return (
    <div >  	
        <AddTable name= "Drug" 
                  lnk="drug" 
                  autoFill = "product"
                  autoFillLink = "productDrugAutoFill"
        />
    </div>
  );
}