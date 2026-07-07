import { useState, useEffect, useMemo} from 'react';
import { useLocation} from 'react-router';
import { AddForm } from '../components/AddForm';
import { ModifyForm } from '../components/ModifyForm';
import { AddModifyTableForm } from '../components/AddModifyTableForm';
import { Tabs } from '../components/Tabs';
import { Tab } from '../components/Tab';
import {  fetchRecordById } from "../functions/fetchRecordById.js";

export function InPatientTabs(props) {
    const { state } = useLocation();

    const link = state?state.formTabLink:props.formTabLink;
    const patientLink = 'patient';
    const formTabId = state?state.formTabId:props.formTabId;
    const formTabEntity = state?state.formTabEntity:props.formTabEntity;
    const disabledFields = state?state.disabledFields:props.disabledFields;
    const excludeFields = state?state.excludeFields:props.excludeFields;

    //console.log(formTabId)

    const [tabData, setTabData] = useState({});
    const [doctorVisitData, setDoctorVisitData] = useState({});
    const [demographicsData, setDemographicsData] = useState({});
    const [admissionRequestData, setAdmissionRequestData] = useState({});
    const [loading, setLoading] = useState(true);

    const cleanedRecord = useMemo(() => {
        if (!tabData) return {};
        const cleaned = {};
        Object.entries(tabData).forEach(([key, value]) => {
            if (typeof value === "string" && value.includes(String.fromCharCode(31))) {
                cleaned[key] = value.substring(0, value.indexOf(String.fromCharCode(31)));
            } else {
                cleaned[key] = value;
            }
        });
        return cleaned;
    }, [tabData]);
//console.log(tabData)
    const fakeState =  useMemo(() => ({
        tabData: Object.keys(tabData),   // schema
        initialData: tabData,            // record
        bodyData: cleanedRecord,   // cleaned record 
        page: "Doctor Visit",
        lnk: "doctorVisit",
        payment:"doctorVisitTran",
        noNavigate:true,
        disabledFields: disabledFields,
        excludeFields: {id: '', createdBy: '', createdDate: '', patientId: '', personId: '', bodyTemperature: '', pulseRate: '', respirationRate: '', bloodPressure: '', bloodSugar: '', weight: '', height: '', doctorNotes: ''
                        , nurseNotes: '', transactionId: '',grossAmount: '',netAmount: '',coPay: '',insurancePay: '',discount: ''}
}), [tabData, cleanedRecord, disabledFields]);

    const vitalState = useMemo(() => ({
        tabData: Object.keys(doctorVisitData),   // schema
        initialData: doctorVisitData,            // record
        rec:doctorVisitData, 
        lnk: "doctorVisit",
        noNavigate:true,
        disabledFields: {transactionId: '',grossAmount: '',netAmount: '',coPay: '',insurancePay: '',discount: ''},
        excludeFields: {id: '', createdBy: '', createdDate: '', patientId: '', personId: '', doctorVisitType: '', visitDate: '', patient: '', clinic: '', clinicRoom: '', doctor: '', paymentType: '', insuranceCompany: '', insurancePlan: '', insuranceNumber: '', insuranceGroup: ''}
    }), [doctorVisitData, disabledFields]);

    const demographicState = useMemo(() => ({
        tabData: Object.keys(demographicsData),   // schema
        initialData: demographicsData,            // record
        rec: demographicsData, 
        lnk: "patient",
        noNavigate:true,
        disabledFields: {person: '', patientStatus: '', birthDate: '', gender: '', ethnicity: '', race: '', hairColor: '', eyeColor: '', citizenship: '', placeOfBirth: '', bloodType: ''},
        excludeFields: {id: '', createdBy: '', createdDate: ''}
    }), [demographicsData, disabledFields]);

    const admissionRequestState = useMemo(() => ({
        tabData: Object.keys(admissionRequestData),   // schema
        initialData: admissionRequestData,            // record
        rec: admissionRequestData, 
        lnk: "admissionRequest",
        noNavigate:true,
        disabledFields: disabledFields,
        excludeFields: {id: '', createdBy: '', createdDate: '', admissionRequestStatus: ''}
    }), [admissionRequestData, disabledFields]);

    const tabs = [
        {label: 'Demographics',  content:   <Tab title= 'Demographics'>
                                                <ModifyForm state={demographicState}/>
                                            </Tab>},
        {label: 'Vital Signs',  content:    <Tab title= 'Vital Signs'>
                                                <AddModifyTableForm key={doctorVisitData.id} lnk="doctorVisitVitals" lnkId = {doctorVisitData.id} />
                                            </Tab>},
        {label: 'Visit Diagnoses',    content:    <Tab title= 'Visit Diagnoses'>
                                                <AddModifyTableForm key={doctorVisitData.id} lnk="doctorVisitDiagnoses" lnkId = {doctorVisitData.id} autoFill = "diagnosesDescription" autoFillLink = "diagnosesAutoFill"/>
                                            </Tab>},
        {label: 'Visit Orders',  content:    <Tab title= 'Visit Orders'>
                                                <AddModifyTableForm key={doctorVisitData.id} lnk="doctorVisitOrder" lnkId = {doctorVisitData.id} autoFill = "product" autoFillLink = "productAutoFill"/>
                                            </Tab>},
        {label: 'Medications',  content:    <Tab title= 'Medications'></Tab>},
        
        {label: 'Admission Request',  content:   <Tab title= 'Admission Request'>
                                                <ModifyForm state={admissionRequestState}/>
                                            </Tab>}
    ];

    useEffect(() => {
        async function loadVisit() {
            const visitDiagnoses = await fetchRecordById('doctorVisitDiagnoses', doctorVisitData.id); 

        }
        loadVisit();
    }, [doctorVisitData]);
    
    useEffect(() => {
        async function load() {
            let doctorVisit;
            let person
            let admissionRequest
            console.log(formTabId) 
            if(formTabEntity === 'doctorVisit'){
                doctorVisit = await fetchRecordById(link, formTabId);   //link would be doctorVisit
                person = await fetchRecordById(patientLink, doctorVisit.patientId);
                admissionRequest = await fetchRecordById('admissionRequestByDoctorVisit', doctorVisit.id);
            }else if(formTabEntity === 'patient'){
                doctorVisit = await fetchRecordById(link, formTabId);   //link would be doctorVisitPatient
                person = await fetchRecordById(patientLink, formTabId);
                console.log(person)
                admissionRequest = await fetchRecordById('admissionRequestByDoctorVisit', doctorVisit.id);
                console.log(admissionRequest)
            }
            console.log(admissionRequest) 
            setTabData(doctorVisit || {});
            setDoctorVisitData(doctorVisit || {});
            setDemographicsData(person || {});
            setAdmissionRequestData(admissionRequest || {});
            setLoading(false);
            
        }
        load();
    }, [link, formTabId]);

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
                <Tabs tabs= {tabs}/>
            </div>
    </>
  );
}