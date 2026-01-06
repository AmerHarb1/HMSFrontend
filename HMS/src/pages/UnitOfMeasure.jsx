import  {AddTable } from '../components/AddTable';

export function UnitOfMeasure() {
  const excludeFields = { id: "", createdBy: "", createdDate: "", accountNumber:"" }
  return (
    <div >  	
        <AddTable name= "UnitOfMeasure" lnk="unitOfMeasure" excludeFields={excludeFields}/>
    </div>
  );
}