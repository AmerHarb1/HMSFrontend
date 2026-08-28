import { useNavigate, useLocation} from 'react-router';
import React, { useState, useEffect, useRef } from 'react';
import  {Master } from '../components/Master';

export function PatientMedicationDetail(props) {
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
      // Reinitialize everything when navigating with new state
      if (state) {
        //  setTabData(state.tabData ?? []);
          setMasterFields(
              normalizeFields(
                  state.masterFields ??
                  state.tabData ??
                  state.initialData ??
                  []
              )
          );
          setFormData(JSON.parse(JSON.stringify(state.rec ?? {})));
          setMasterId(state.masterId);
      }
  }, [state]);

  
  const detail = state?state.detail:null;
  const [tabData, setTabData] = useState(state?.initialData);
  const initialData = state?.initialData ?? props.initialData ?? props.masterDefaultValues;
  const rec = JSON.parse(JSON.stringify(props.rec?props.rec:state?state.rec ?? {}:{}));
  const [formData, setFormData] = useState(rec); 
  const normalizeFields = (data) =>
          Array.isArray(data)
              ? data
              : typeof data === "object" && data !== null
                  ? Object.keys(data)
                  : [];
  
      const tabDataFields = normalizeFields(state?.tabData ?? props.tabData);
      //const masterFields = normalizeFields(state?.masterFields ?? props.masterFields ?? props.tabData);
      const [masterFields, setMasterFields] = useState(
      normalizeFields(
          state?.masterFields ??
          props.masterFields ??
          props.tabData ??
          initialData   // fallback: derive keys from record
      )
      );
  const normalizeRecord = (rec) => {
      const cleaned = {};
      Object.entries(rec || {}).forEach(([key, value]) => {
          if (value && typeof value === "object" && !Array.isArray(value)) {
              // LOV object → convert to display string
              cleaned[key] = value.name ?? value.code ?? value.id ?? "";
          } else {
              cleaned[key] = value;
          }
      });
      return cleaned;
  }; 
  const normalizedInitialData = normalizeRecord(initialData);    
  const resolveMasterId = () => {
          if (props.masterId !== undefined && props.masterId !== null) {
              return props.masterId;
          }
          if (state?.masterId !== undefined) {
              return state.masterId;
          }
          return undefined//state?.recId ?? null;
      };
  
      const [masterId, setMasterId] = useState(resolveMasterId());
  
      // FIX: update masterId when props.masterId changes
      useEffect(() => {
          
          if (props.masterId !== undefined && props.masterId !== null) {
              setMasterId(props.masterId);
          }
      }, [props.masterId]);
   
      useEffect(() => {
          if (props.rec) {
              setFormData(JSON.parse(JSON.stringify(props.rec)));
          }
      }, [props.rec]);
  
      
  
console.log(masterId)

  return (
    <div >  	
        <Master name= "Patient Medication Detail" 
                  lnk="patientDrugRestriction" 
                  initialData={normalizedInitialData}
                  masterLink = "patientMedicationDetail"
                  detailLink = "patientDrugRestriction"
                  backLink="back"
                  masterId={masterId}
                  subDetailId="subDetailId"
                  showInitialData="yes"   // shows the initial data in AddForm
                  tabData={Object.keys(tabData[0] ?? {})} 
                  detail={detail}
                  disabledFields={{ patient:''
                                , patientId:''
                                , comments:''
                                , id:''
                                , requestDate:''
                                , drugConsumptionRoute: ''
                              }}
                  excludeFields={{  createdBy: ''
                                , createdDate: ''
                              }}
                  forwardKey="patientMedicationDetailId"
                  />
    </div>
  );
}