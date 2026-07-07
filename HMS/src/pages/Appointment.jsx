import { useState, useEffect, useMemo} from 'react';
import { useNavigate, useLocation} from 'react-router';
import  {GetForm } from '../components/GetForm';
import { Tabs } from '../components/Tabs';
import { Tab } from '../components/Tab';
import { Calendar } from '../components/Calendar';
import dayjs from "dayjs";

export function Appointment() {
    const location = useLocation();
    const state = location.state || {};
    const [doctors, setDoctors] = useState([]);
    const [clinic, setClinic] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [patientId, setPatientId] = useState(null);
    const [person, setPerson] = useState(null);
    const [tabs, setTabs] = useState([]);

    const fakeState =  useMemo(() => ({
            tabData: ['patient','AppointmentDate', 'clinic'],
            initialData: {patient: '', AppointmentDate: dayjs().format("YYYY-MM-DD"), clinic: '\x1F'},
            page: "Appointments",
            lnk: "clinicDoctors",
            submitButton: "Doctors",
            id: "clinic",
            search: {   name:           "Patient Search" ,
                        searchLink:     "patientSearch",
                        afterSearchLink:"appointment",
                        formTabLink:    "appointmentClinicPatientDateGet",
                        formTabEntity:  "patient",
                        returnMode:     true,
                        searchFields:   ['PatientId','FirstName', 'LastName', 'BithDate'],
                        searchValues:   {PatientId: '', FirstName: '', LastName: '', BirthDate: ''},
                        excludeFields:  { createdBy: '', createdDate: ''}
            }
    }), []);

    useEffect(() => {
        const newTabs = doctors.map((doctor) => ({
            label: doctor.name,
            content: (
                <Tab title={doctor.name}>
                    <Calendar  selectedDate={selectedDate} lnk={'appointmentClinicDoctorDateGet'} clinic={clinic} doctorId={doctor.id} patientId={patientId} person={person}/>
                </Tab>
            )
        }));

        setTabs(newTabs);
    }, [doctors]);

    useEffect(() => {
        if (state?.selectedRecord && state?.returnField) {
            fakeState.initialData = {
                ...fakeState.initialData,
                [state.returnField]: state.selectedRecord.PatientId
            };
        }
    }, [state]);


  return (
    <>
        <GetForm state={fakeState}
            returnedRecord={state?.selectedRecord}
            returnedField={state?.returnField}
            onSaved={(resData) => {                    
                setDoctors(resData);
            }}
            setClinic={setClinic}
            setSelectedDate={setSelectedDate}
            setPatientId={setPatientId}
            setPerson={setPerson}
        />
        <div >  	
            <Tabs tabs= {tabs?tabs:null}/>
        </div>
    </>
  );
}