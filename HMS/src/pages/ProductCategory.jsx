import  {AddTable } from '../components/AddTable';

export function ProductCategory() {
  const excludeFields = { id: "", createdBy: "", createdDate: "", accountNumber:"" }
  return (
    <div >  	
        <AddTable name= "Product Category" lnk="productCategory" excludeFields={excludeFields}/>
    </div>
  );
}