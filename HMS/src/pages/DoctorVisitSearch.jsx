import  {Search } from '../components/Search';

export function DoctorVisitSearch() {
  return (
    <div >  	
        <Search name= "Doctor Visist Search" 
                lnk="doctorVisitSearch"
                searchLink="doctorVisitTabs"
                formTabLink="doctorVisit"
                formTabEntity="doctorVisit"
                searchFields = {['PatientId','PatientFirstName', 'PatientLastName', 'PatientBithDate', 'clinic', 'clinicRoom', 'doctor']}
                searchValues = {{PatientId: '', PatientFirstName: '', PatientLastName: '', PatientBithDate: '', clinic: '\x1F', clinicRoom: '\x1Fclinic', doctor: '\x1Fclinic'}}
                disabledFields={'patient'}
                excludeFields={{createdBy: '', createdDate: '', bodyTemperature: '', pulseRate: '', respirationRate: '', bloodPressure: '', bloodSugar: '', height: '', weight: ''}}
        />
    </div>
  );
}