import { useState, useEffect, useMemo} from 'react';
import { useLocation} from 'react-router';
import { AddForm } from '../components/AddForm';
import { ModifyForm } from '../components/ModifyForm';
import { AddModifyTableForm } from '../components/AddModifyTableForm';
import { Tabs } from '../components/Tabs';
import { Tab } from '../components/Tab';
import {  fetchRecordById } from "../functions/fetchRecordById.js";

export function DoctorVisitTabs(props) {
    const { state } = useLocation();

    const link = state?state.formTabLink:props.formTabLink;
    const patientLink = 'patient';
    const patientId = state?state.formTabId:props.formTabId;
    const disabledFields = state?state.disabledFields:props.disabledFields;
    const excludeFields = state?state.excludeFields:props.excludeFields;

    const [tabData, setTabData] = useState({});
    const [doctorVisitData, setDoctorVisitData] = useState({});
    const [demographicsData, setDemographicsData] = useState({});
    const [loading, setLoading] = useState(true);

    const fakeState =  useMemo(() => ({
        tabData: Object.keys(tabData),   // schema
        initialData: tabData,            // record
        page: "Doctor Visit",
        lnk: "doctorVisit",
        noNavigate:true,
        disabledFields: disabledFields,
        excludeFields: {id: '', createdBy: '', createdDate: '', patientId: '', personId: '', bodyTemperature: '', pulseRate: '', respirationRate: '', bloodPressure: '', bloodSugar: '', weight: '', height: '', doctorNotes: '', nurseNotes: ''}
}), [tabData, disabledFields]);

    const vitalState = useMemo(() => ({
        tabData: Object.keys(doctorVisitData),   // schema
        initialData: doctorVisitData,            // record
        rec:doctorVisitData, 
        lnk: "doctorVisit",
        noNavigate:true,
        disabledFields: disabledFields,
        excludeFields: {id: '', createdBy: '', createdDate: '', patientId: '', personId: '', doctorVisitType: '', visitDate: '', patient: '', clinic: '', clinicRoom: '', doctor: '', paymentType: '', insuranceCompany: '', insuranceNumber: '', insuranceGroup: ''}
    }), [doctorVisitData, disabledFields]);

    const demographicState = useMemo(() => ({
        tabData: Object.keys(demographicsData),   // schema
        initialData: demographicsData,            // record
        rec: demographicsData, 
        lnk: "patient",
        noNavigate:true,
        disabledFields: disabledFields,
        excludeFields: {id: '', createdBy: '', createdDate: ''}
    }), [demographicsData, disabledFields]);

    const tabs = [
        {label: 'Vital Signs',  content:    <Tab title= 'Vital Signs'>
                                                <ModifyForm key={doctorVisitData.id} state={vitalState}/>
                                            </Tab>},
        {label: 'Diagnoses',    content:    <Tab title= 'Diagnoses'>{console.log(doctorVisitData.id)}
                                                <AddModifyTableForm key={doctorVisitData.id} lnk="doctorVisitDiagnoses" lnkId = {doctorVisitData.id}/>
                                            </Tab>},
        {label: 'Medications',  content:    <Tab title= 'Medications'></Tab>},
        {label: 'Demographics',  content:   <Tab title= 'Demographics'>
                                                <ModifyForm state={demographicState}/>
                                            </Tab>}
    ];

    useEffect(() => {
        async function loadVisit() {
            const visitDiagnoses = await fetchRecordById('doctorVisitDiagnosis', doctorVisitData.id); 

        }
        loadVisit();
    }, [doctorVisitData]);
    
    useEffect(() => {
        async function load() {
            const doctorVisit = await fetchRecordById(link, patientId);
            const person = await fetchRecordById(patientLink, patientId);
        //console.log(doctorVisit)
            setTabData(doctorVisit || {});
            setDoctorVisitData(doctorVisit || {});
            setDemographicsData(person || {});
            setLoading(false);
        }
        load();
    }, [link, patientId]);

    return(
    <>
        <div > 
            {!loading && tabData && Object.keys(tabData).length > 0 && (	
                <AddForm    state={fakeState}
                    onSaved={(newId) => {
                        //console.log("Doctor Visit saved with ID:", newId);
                        setDoctorVisitData(prev => ({ ...prev, id: newId }));
                    }}
                />)
            }
            </div>
            <div >  	
                <Tabs   tabs= {tabs}
                />
            </div>
    </>
  );
}