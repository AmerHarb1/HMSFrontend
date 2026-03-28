import  {AddTable } from '../components/AddTable';

export function Account() {
  const excludeFields = { id: "", createdBy: "", createdDate: "", accountNumber:"" }
  return (
    <div >  	
        <AddTable name= "Accounts" lnk="account" excludeFields={excludeFields}/>
    </div>
  );
}