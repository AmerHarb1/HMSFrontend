import { useState, useEffect, useMemo} from 'react';
import  {AddForm } from '../components/AddForm';
import  {Master } from '../components/Master';
import { useLocation} from 'react-router';
import {  fetchRecordById } from "../functions/fetchRecordById.js";

export function SearchTarget(props) {
  const location = useLocation();
  const state = location.state || {};
  const lnkId = state?state.lnkId:0;
  const formTabId = state?state.formTabId:props.formTabId;
  const link = state?state.formTabLink??props.formTabLink:"patientMedication";
  const detailLink = state?state.detailLink??props.detailLink:"patientMedicationDetail";  
  const [tabData, setTabData] = useState({});
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState({});
  const excludeFields = state.excludeFields ?? {
                                                createdBy: ''
                                              , createdDate: ''
                                              };
  const disabledFields = state.disabledFields??{patient:'',product:'',id:''};

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

  useEffect(() => {
          async function load() {
              const data = await fetchRecordById(link, formTabId) ;   //link would be doctorVisit   
              setPatientData(data);          
              setTabData(data);
              setLoading(false);              
          }
          load();
      }, [link, formTabId]);

  return (
    <div >  
        <Master   detail="Detail"
                  initialData={patientData}   // the record object
                  rec={patientData}
                  tabData={Object.keys(tabData ?? {})}
                  title = "Patient Medication"
                  lnk = "patientMedication"
                  masterId={tabData.id}
                  formTabId = {formTabId}
                  masterLink = "patientMedication"
                  detailLink = {detailLink}
                  autoFill = "drug"
                  autoFillLink = "drugAutoFill"
                  lnkId = {formTabId}
                  backLink="back"
                  subDetailId="subDetailId"
                  disabledFields = {disabledFields}
                  excludeFields = {excludeFields}
                  forwardKey="patientMedicationId"/>
    </div>
  );
}