import  {AddTable } from '../components/AddTable';

export function AbcCategory() {
  const excludeFields = { id: "", createdBy: "", createdDate: "", accountNumber:"" }
  return (
    <div >  	
        <AddTable name= "AbcCategory" lnk="abcCategory" excludeFields={excludeFields}/>
    </div>
  );
}