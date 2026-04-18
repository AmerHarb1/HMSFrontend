import  {AddTable } from '../components/AddTable';

export function Product() {
  const excludeFields = { id: "", createdBy: "", createdDate: "", itemNumber:"" }
  return (
    <div >  	
        <AddTable name= "Product" lnk="product" excludeFields={excludeFields}/>
    </div>
  );
}