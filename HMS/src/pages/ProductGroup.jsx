import  {AddTable } from '../components/AddTable';

export function ProductGroup() {
  const excludeFields = { id: "", createdBy: "", createdDate: "", accountNumber:"" }
  return (
    <div >  	
        <AddTable name= "ProductGroup" lnk="productGroup" excludeFields={excludeFields}/>
    </div>
  );
}