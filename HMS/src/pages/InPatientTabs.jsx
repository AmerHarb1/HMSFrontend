import { useState, useEffect, useMemo} from 'react';
import { useLocation} from 'react-router';
import { AddTable } from '../components/AddTable';
import { AddForm } from '../components/AddForm';
import { GetForm } from '../components/GetForm';
import { TableTable } from '../components/TableTable';
import { ModifyForm } from '../components/ModifyForm';
import { AddModifyTableForm } from '../components/AddModifyTableForm';
import { Tabs } from '../components/Tabs';
import { Tab } from '../components/Tab';
import {  fetchRecordById } from "../functions/fetchRecordById.js";
import {  fetchRecordPageById } from "../functions/fetchRecordPageById.js";

export function InPatientTabs(props) {
    const { state } = useLocation();

    const link = state?state.formTabLink:props.formTabLink;
    const patientLink = 'patient';
    const formTabId = state?state.formTabId:props.formTabId;
    const formTabEntity = state?state.formTabEntity:props.formTabEntity;
    const disabledFields = state?state.disabledFields:props.disabledFields;
    const excludeFields = state?state.excludeFields:props.excludeFields;

    const [tabData, setTabData] = useState({});
    const [admissionData, setAdmissionData] = useState({});
    const [inPatientVitalsData, setInPatientVitalsData] = useState({});
    const [doctorVisitData, setDoctorVisitData] = useState({});
    const [demographicsData, setDemographicsData] = useState({});
    const [admissionRequestData, setAdmissionRequestData] = useState({});
    const [nextOfKinData, setNextOfKinData] = useState({});
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
        page: "In Patient",
        lnk: "admissionByPatient",
        formTabId:formTabId,
        lnkId:formTabId,
        noNavigate:true,
        noButtons:true,
        showInitialData:"yes",   // shows the initial data in AddForm
        disabledFields: disabledFields,
        excludeFields: excludeFields
}), [tabData, cleanedRecord, disabledFields]);
/*
    const vitalState = useMemo(() => ({
        tabData: Object.keys(inPatientVitalsData),   // schema
        initialData: inPatientVitalsData,            // record
        rec:inPatientVitalsData, 
        lnk: "inPatientVitalsByAdmission",
        noNavigate:true,
        disabledFields: {transactionId: '',grossAmount: '',netAmount: '',coPay: '',insurancePay: '',discount: ''},
        excludeFields: {id: '', createdBy: '', createdDate: '', patientId: '', personId: '', doctorVisitType: '', visitDate: '', patient: '', clinic: '', clinicRoom: '', doctor: '', paymentType: '', insuranceCompany: '', insurancePlan: '', insuranceNumber: '', insuranceGroup: ''}
    }), [doctorVisitData, disabledFields]);
*/
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

    const nextOfKinState = useMemo(() => ({
            tabData: Object.keys(nextOfKinData),   // schema
            initialData: nextOfKinData,            // record
            rec: nextOfKinData, 
            lnk: "personNextOfKin",
            noNavigate:true,
            disabledFields: disabledFields,
            excludeFields: {id: '', createdBy: '', createdDate: '', admissionRequestStatus: ''}
        }), [admissionRequestData, disabledFields]);
    
    
        const tabs = [
            {label: 'Next Of Kin',  content:   <Tab title= 'Next Of Kin'>
                                                    <AddTable lnk="personNextOfKin" entryView="view" modifyView="view" state={nextOfKinState} lnkId = {admissionData.personId}/>
                                                </Tab>},
            {label: 'Demographics',  content:   <Tab title= 'Demographics'>
                                                    <ModifyForm state={demographicState}/>
                                                </Tab>},
            {label: 'Vital Signs',  content:    <Tab title= 'Vital Signs'>
                                                    <AddModifyTableForm key={admissionData.id} lnk="inPatientVitals" lnkId = {admissionData.id} showInitialData="yes"/>
                                                </Tab>},
            {label: 'Diagnoses',    content:    <Tab title= 'Visit Diagnoses'>
                                                    <AddModifyTableForm key={doctorVisitData.id} 
                                                                        lnk="inPatientDiagnoses" 
                                                                        lnkId = {admissionData.id} 
                                                                        autoFill = "diagnoses" 
                                                                        autoFillLink = "diagnosesAutoFill"
                                                                        showInitialData="yes"/>
                                                </Tab>},
            {label: 'Doctor Orders',  content:   <Tab title= 'Visit Orders'>
                                                    <AddModifyTableForm key={doctorVisitData.id} 
                                                                        lnk="inPatientOrder" 
                                                                        lnkId = {admissionData.id} 
                                                                        autoFill = "product" 
                                                                        autoFillLink = "productAutoFill"
                                                                        showInitialData="yes"/>
                                                </Tab>},
            {label: 'Medications',  content:    <Tab title= 'Medications'>
                                                    <AddTable lnk="patientMedicationDetailByPatient" entryView="view" modifyView="view"  lnkId = {admissionData.patientId}/>
                                                </Tab>},
            
            {label: 'Doctor Assignment', content:<Tab title= 'Doctor Assignment'>
                                                    <AddModifyTableForm key={admissionData.id} lnk="inPatientDoctor" lnkId = {admissionData.id} showInitialData="yes"/>
                                                </Tab>},
            {label: 'Bed Transfer', content:<Tab title= 'Bed Transfer'>
                                                    <AddModifyTableForm key={admissionData.id} lnk="inPatientBedTransfer" lnkId = {admissionData.id} showInitialData="yes"/>
                                                </Tab>},
            {label: 'Labs',  content:   <Tab title= 'Labs'>
                                                            <TableTable lnk="labRequest"  detailLnk="labResultByRequest" lnkId = {admissionData.patientId} showInitialData="yes"/>
                                                        </Tab>}, 
            {label: 'Xrays',  content:   <Tab title= 'Xrays'>
                                                <TableTable lnk="xrayRequest"  detailLnk="xrayResultByRequest" lnkId = {admissionData.patientId} showInitialData="yes"/>
                                            </Tab>},                                                     
            {label: 'Out Of Room', content:<Tab title= 'Out Of Room'>
                                                    <AddModifyTableForm key={admissionData.id} lnk="inPatientOutOfRoom" lnkId = {admissionData.id} showInitialData="yes"/>
                                                </Tab>},
            {label: 'Visits', content:<Tab title= 'Visits'>
                                                    <AddModifyTableForm key={admissionData.id} lnk="inPatientVisit" lnkId = {admissionData.id} showInitialData="yes"/>
                                                </Tab>}            
                                                
        ];

    
    
    useEffect(() => {
        async function load() {
            const admissionData = await fetchRecordById(link, formTabId);   //link would be doctorVisit
            const person = await fetchRecordById(patientLink, admissionData.patientId);
            const inPatientVitalsData = await fetchRecordPageById('inPatientVitals', admissionData.id);
        //    const kin = await fetchRecordById('personNextOfKin', person.id);
            setTabData(admissionData || {});
            setAdmissionData(admissionData || {});
            setInPatientVitalsData(inPatientVitalsData || {});
            setDemographicsData(person || {});
        //    setAdmissionRequestData(admissionRequest || {});
        //    setNextOfKinData(kin);
            setLoading(false);
            
        }
        load();
    }, [link, formTabId]);

    return(
    <>
        <div > 
            {!loading && tabData && Object.keys(tabData).length > 0 && (	
                <AddForm    state={fakeState}         />)
            }
            </div>
            <div >  	
                <Tabs tabs= {tabs}/>
            </div>
    </>
  );
}