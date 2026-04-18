import  {AddTable } from '../components/AddTable';

export function DoctorVisitView() {
  return (
    <div >  	
        <AddTable   name= "Doctor Visit View" 
                    lnk="doctorVisitView" 
                    formTabLink="doctorVisit"
                    formTabEntity="doctorVisit"
        />
    </div>
  );
}