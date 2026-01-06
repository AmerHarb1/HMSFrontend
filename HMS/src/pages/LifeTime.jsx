import  {AddTable } from '../components/AddTable';

export function LifeTime() {
  const excludeFields = { id: "", createdBy: "", createdDate: "", accountNumber:"" }
  return (
    <div >  	
        <AddTable name= "LifeTime" lnk="lifeTime" excludeFields={excludeFields}/>
    </div>
  );
}