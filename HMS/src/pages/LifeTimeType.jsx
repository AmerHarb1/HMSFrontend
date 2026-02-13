import  {AddTable } from '../components/AddTable';

export function LifeTimeType() {
  const excludeFields = { id: "", createdBy: "", createdDate: "", accountNumber:"" }
  return (
    <div >  	
        <AddTable name= "LifeTimeType" lnk="lifeTimeType" excludeFields={excludeFields}/>
    </div>
  );
}