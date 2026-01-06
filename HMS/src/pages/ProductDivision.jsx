import  {AddTable } from '../components/AddTable';

export function ProductDivision() {
  const excludeFields = { id: "", createdBy: "", createdDate: "", accountNumber:"" }
  return (
    <div >  	
        <AddTable name= "ProductDivision" lnk="productDivision" excludeFields={excludeFields}/>
    </div>
  );
}