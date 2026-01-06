import  {AddTable } from '../components/AddTable';

export function XyzCategory() {
  const excludeFields = { id: "", createdBy: "", createdDate: "", accountNumber:"" }
  return (
    <div >  	
        <AddTable name= "XyzCategory" lnk="xyzCategory" excludeFields={excludeFields}/>
    </div>
  );
}