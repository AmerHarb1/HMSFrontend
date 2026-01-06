import  {AddTable } from '../components/AddTable';

export function StockingCondition() {
  const excludeFields = { id: "", createdBy: "", createdDate: "", accountNumber:"" }
  return (
    <div >  	
        <AddTable name= "StockingCondition" lnk="stockingCondition" excludeFields={excludeFields}/>
    </div>
  );
}