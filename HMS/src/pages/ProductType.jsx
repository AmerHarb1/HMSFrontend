import  {AddTable } from '../components/AddTable';

export function ProductType() {
  const excludeFields = { id: "", createdBy: "", createdDate: "", accountNumber:"" }
  return (
    <div >  	
        <AddTable name= "ProductType" lnk="productType" excludeFields={excludeFields}/>
    </div>
  );
}