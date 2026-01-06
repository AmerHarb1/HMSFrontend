import  {AddTable } from '../components/AddTable';

export function Product() {
  const excludeFields = { id: "", createdBy: "", createdDate: "", accountNumber:"" }
  return (
    <div >  	
        <AddTable name= "Product" lnk="product" excludeFields={excludeFields}/>
    </div>
  );
}