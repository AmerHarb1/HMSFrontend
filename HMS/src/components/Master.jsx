import { DatePicker , message,  Space, Statistic, Typography } from "antd";
import axios from 'axios';
import dayjs from "dayjs";
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation} from 'react-router';
import { getHeader } from "../functions/getHeader";
import {  lovChange } from "../functions/lovChange.js";
import { MasterDetails } from './MasterDetails';
import {  getLovData } from "../functions/getLovData.js";
import {  selectCodeDesc } from "../functions/selectCodeDesc.js";
import {  resolvePrimaryKey } from "../functions/resolvePrimaryKey.js";
import {  getParentsFormValues } from "../functions/getParentsFormValues.js";
import { fetchInitLov } from "../functions/fetchInitLov.js";
import {  lovInit } from "../functions/lovInit.js";
import {  getLovVal } from "../functions/getLovVal.js";
import { toSpacedWords } from "../functions/toSpacedWords.js";
import '../styles/page.css';

export function Master(props) {
    const { state } = useLocation();
    const localLovMapRef = useRef(new Map()); //once this page is visited, lovMap will be set up. when the page is submitted, lovMap wil be reseted, 
                                            // so not to reload it again, localLovMapRef is passed to the masterDetail and from it back to Master be reload lovMap 
    const safeFormData = state?.serviceFormData ?? {};
    const initialData = state?.initialData ?? props.initialData ?? props.masterDefaultValues;
    const [ready, setReady] = useState(false);
    const [backReady, setBackReady] = useState(false);
    const showInitialData = props.showInitialData   // shows the initial data in AddForm
    //const masterFields = state?state.masterFields??props.masterFields:props.tabData; 
    //const tabDataFields = (state?.tabData && typeof state.tabData === "object") ? state.tabData : (props.tabData && typeof props.tabData === "object") ? props.tabData : {};
    //const [tabData, setTabData] = useState(state?state.tabData:masterFields ? masterFields : props.masterFields?props.masterFields:state.masterFields); 
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
    const [tabData, setTabData] = useState(
            normalizeFields(state?.tabData ?? masterFields ?? props.tabData)
        );   
    const masterDefaultValues = normalizedInitialData ?? normalizedInitialData ?? state?.masterDefaultValues  ?? props.masterDefaultValues;    
    const [lovMap, setLovMap] = useState(new Map());
    const [parentChildLovMap, setParentChildLovMap] = useState(new Map());//create map that holds the parent child
    const [dateCols, setDateCols] = useState([]);
    const [serviceFormData, setServiceFormData] = useState(state?.serviceFormData ?? {});
    const [serviceAddFormData, setServiceAddFormData] = useState(state?.serviceFormData ?? {});

    const resolveBackLink = () => {
        if (props.backLink !== undefined && props.backLink !== null) {
            return props.backLink;
        }
        if (state?.backLink !== undefined) {
            return state.backLink;
        }
        return undefined//state?.recId ?? null;
    };
//console.log("Master class:", props.class);    
    const headers = getHeader();
    const linkLov = "http://localhost:9002/hms/";
    const lnk = props.lnk?props.lnk:state.lnk;
    const backLink = resolveBackLink();
    const detail = props.detail?props.detail:state?state.detail:null;
    const title = props.title?props.title:state.title;
    const masterCode = props.masterCode?props.masterCode:state?state.masterCode:null;
    const masterCodeValue = props.masterCodeValue?props.masterCodeValue:state?state.masterCodeValue:null;
    const masterLocalLovMap = state?.masterLocalLovMap ?? {}; 
    
    const subDetailId = props.subDetailId;
    
    //const tabData = ['productType', 'productDivision', 'productGroup', 'productCategory', 'itemNumber'];
    const excludeFields = state?.excludeFields ?? props.excludeFields; 
    const detailExcludeFields = state?.detailExcludeFields ?? props.detailExcludeFields;
    const disabledFields = props.disabledFields??state?.disabledFields?? {};
    const rec = JSON.parse(JSON.stringify(props.rec?props.rec:state?state.rec ?? {}:{}));
    
    const [formData, setFormData] = useState(normalizeRecord(rec)); 
    const [detailLink, setDetailLink] = useState(props.detailLink  ?? state?.detailLink); 
    const [forwardKey, setForwardKey] = useState( props.forwardKey ?? state?.forwardKey);
    const autoFill = props.autoFill;
    const autoFillLink = props.autoFillLink;
    const autoFillParent = props.autoFillParent;//used as the parent for auto fill
    
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

    useEffect(() => {
        if (props.tabData && props.tabData.length > 0) {
            setMasterFields(props.tabData);
        }
    }, [props.tabData]);

    useEffect(() => {
        if (masterFields && masterFields.length > 0) {
            setTabData(masterFields);
        }
    }, [masterFields]);

    let backId = state?.backId ?? formData.id;
    const detailChild = state?.detailChild ?? null;
    const createdBy = state?.createdBy ?? {};
  	const createdOn = state?.createdOn ?? null;
    const comments = state?.comments ?? null;
    const masterLink = state?.masterLink ?? props?.masterLink ?? lnk;
    const detailSubmitLink = state?.detailSubmitLink ?? props.detailSubmitLink;
    const masterSubmitButton = state?.masterSubmitButton ?? props.masterSubmitButton ?? "Details";
    const detailSubmitButton = state?.detailSubmitButton ?? props.detailSubmitButton;
    const entryView = state?.entryView??props.entryView;
    const updateMaster = state?.updateMaster??props.updateMaster;
    const api = state?.updateLink ?? lnk;
    const apiLnk = `http://localhost:9002/hms/${api}/${masterId}`;  //added updateLink on 07/15/2026 to be used in Master as the update Link

    const navigate = useNavigate();

     if(masterLocalLovMap !== undefined && masterLocalLovMap.current !== undefined && masterLocalLovMap.current.size > 0){        
        //localLovMapRef.current = new Map(masterLocalLovMap.current);// If parent passed a ref, copy its contents, but DO NOT replace the ref object
        localLovMapRef.current.clear();
        masterLocalLovMap.current.forEach((v, k) => {
            localLovMapRef.current.set(k, v);
        });
     //   console.log(localLovMapRef.current)
     }

    useEffect(() => {
        if (localLovMapRef.current === null) {
            localLovMapRef.current = new Map();
        }

        if (masterLocalLovMap?.current instanceof Map) {
            localLovMapRef.current = new Map(masterLocalLovMap.current);
        }
    }, []);

    useEffect(() => {
        setDetailLink(props.detailLink)
    }, [props.detailLink]);

    useEffect(() => {
        setForwardKey(props.forwardKey)
    }, [props.forwardKey]);

    

    useEffect(() => { 
        const run = async () => {
            setBackReady(false); 
        //    console.log(masterId);  
            if (backId || masterId) { 
                if(localLovMapRef === undefined || localLovMapRef.current === undefined || localLovMapRef.current.size === 0){
                    //console.log('Here1')
                    await populateMaster(formData);//formData
                }else{
                    //console.log('Here2')
                    setLovMap(localLovMapRef.current);  //see comments on top for localLovMapRef
                }
                 
                setBackReady(true); 
            } else if (masterCodeValue) { 
                console.log(masterCodeValue); 
                getMasterByCode(masterCodeValue); 
            } 
        }; 
        run(); 
    }, [backId,masterId]); 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLovChange = (event) => {
        setReady(false);
        const { name, value } = event.target;         
        const updatedFormData = { ...formData, [name]: value }; // Build the updated formData manually
        setFormData(updatedFormData);
        lovChange(updatedFormData, name, parentChildLovMap, setLovMap, headers, linkLov, localLovMapRef);
        // This runs for ALL LOV fields, including root
        setLovMap((prev) => {
            const updated = new Map(prev);
            localLovMapRef.current = updated;
            return updated;
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(masterId === undefined){
            console.log(formData.id)
            setMasterId(formData.id)
        }
        if(detail !== undefined && detail !== null && detail !== ""){   //real Master Detail
            if(localLovMapRef === undefined || localLovMapRef.current === undefined || localLovMapRef.current.size === 0){
                const run = async () => {                     
                    await populateMaster();        
                }; 
                run();
            }
            if(formData.id > 0){
                setBackReady(false);
            }else{
                saveMaster();
            }
            
        }else{                      //self Master and detail
            console.log(masterCode)
            getMasterByCode(getParentsFormValues(formData, masterCode))
            setBackReady(true);
        }            
        
    };

    useEffect(() => {
         if(backId){            
            //getLovDataNoParent(tabData, formData, setParentChildLovMap, setLovMap, linkLov, headers, setDateCols, setFormData);            
         }else{
            if(masterDefaultValues){
                //console.log(masterDefaultValues)
                getLovData(tabData, masterDefaultValues, setParentChildLovMap, setLovMap, linkLov, headers, setDateCols);
            }             
         }
    }, [masterDefaultValues]);
 
    useEffect(() => {
        if(backReady && formData !== undefined && formData !== null){
            setReady(true);
        }
    }, [backReady]);

    const updateClicked = (event) => {
  		event.preventDefault();
		const obj = tabData.reduce((o, key) => ({ ...o, [key]: key=="id"? rec.id
                                                                        : key=="code"       ? rec.code
                                                                        : key=="pk"         ? rec.pk.code
                                                                        : key=="createdBy"  ? createdBy
                                                                        : key=="createdon"  ? createdOn
                                                                        : key=="comments"   ? comments
                                                                        : lovMap.has(key)   ? getLovVal(lovMap.get(key), formData[key])
                                                                        : formData[key]                                                    
                                                }), {}
                                   )//Object.assign({}, ...Object.entries({...formObj}).map(([a,b]) => ({ [b]: formData[b] })))	 
        console.log(obj)                                            
	  	axios.put(apiLnk,obj,{headers: headers});
    }
	
	const deleteClicked = (event) => {
  		event.preventDefault();
  		var answer = window.confirm("Are you sure you want to Delete master data?");
    	if (answer) {
		  // Save it!
		  axios.delete(apiLnk,{headers: headers}
  				).then(() => {navigate('/'+lnk);})
                 .catch((error) => {console.warn("response", error.response?.data)});
		} else {
		  // Do nothing!
		  console.log('Thing was not saved to the database.');
		}
	};

    // get fields to be displayed 
    const displayField = tabData.filter(key=>{
        return  !(key in excludeFields); 
    }); 

    // Build pairs for 2-column layout 
    const fieldPairs = []; 
    for (let i = 0; i < displayField.length; i += 2){ 
        fieldPairs.push(displayField.slice(i, i + 2));
    }

    // Helper to render label + input cells 
    const renderFieldCells = (fieldName) => { 
        if (!fieldName || fieldName in excludeFields) { // not needed anymore
            return ( 
                <> 
                    <td className="label-cell empty"></td> 
                    <td className="input-cell empty"></td> 
                </> 
            ); 
        }

        const isLov = lovMap.has(fieldName) || (localLovMapRef.current && localLovMapRef.current.has(fieldName)); 
        const isDate = dateCols.includes(fieldName);

    return ( 
                <> 
                    <td className="label-cell"> <label>{toSpacedWords(fieldName)}:</label> </td> 
                    <td className="input-cell"> 
                        {isLov ? ( 
                            <select name={fieldName} value={formData[fieldName] ?? ""} disabled={fieldName in disabledFields} onChange={handleLovChange} className="selectInput" > 
                                <option value="">-- Select --</option> 
                                {Array.from(lovMap.get(fieldName) || localLovMapRef.current.get(fieldName) || []).map((opt) => ( 
                                    <option key={resolvePrimaryKey(opt)} value={selectCodeDesc(opt, formData[fieldName])}>
                                        {opt.name || opt.username || opt.description}
                                    </option>
                                ))} 
                            </select> ) 
                        : isDate ? ( 
                            <DatePicker id={fieldName} 
                                        name={fieldName} 
                                        value={formData[fieldName] ? dayjs(formData[fieldName], "YYYY-MM-DD") : null} 
                                        disabled={fieldName in disabledFields} format="MM/DD/YYYY" 
                                        onChange={(date) => setFormData((prev) => ({ ...prev, [fieldName]: date ? date.format("YYYY-MM-DD") : null })) } 
                                        className="dateField" /> ) 
                        : ( 
                            <input type="text" id={fieldName} name={fieldName} value={formData[fieldName] ?? ""} disabled={fieldName in disabledFields} onChange={handleChange} /> )} 
                    </td> 
                </> 
            ); 
        };

    
        return ( 
            <div className="form-table"> 
                <Space size={15} direction="vertical"> 
                    <Typography.Text className="Title">{title}</Typography.Text> 
                    <form onSubmit={handleSubmit}> 
                        <table className="entry-Tab"> 
                            <tbody> 
                                {fieldPairs.map((pair, rowIndex) => ( 
                                    <tr key={rowIndex}> 
                                        {/* LEFT FIELD */} 
                                        {renderFieldCells(pair[0])} 
                                        {/* FIXED GAP COLUMN */} 
                                        <td className="gutter"></td> 
                                        {/* RIGHT FIELD OR EMPTY */} 
                                        {pair.length === 2 
                                            ? renderFieldCells(pair[1]) 
                                            : (
                                            <>
                                                <td className="label-cell empty"></td>
                                                <td className="input-cell empty"></td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                          
                       
                                <tr className="button-row">
                                    <td td colSpan={4}>
                                        <div className="button-group"> 
                                            {entryView !== "view" || (masterSubmitButton !== undefined || masterSubmitButton !== null) ?
                                            <button className="form-button" type="submit">{masterSubmitButton}</button>:null}
                                            {updateMaster !== "no"?  
                                            <button className="form-button" onClick={updateClicked}>Update</button>:null}
                                            {masterId && entryView !== "view"?                                          
                                            <button className="form-button" onClick={deleteClicked}>Delete</button>:null}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/* ✅ Render the Detail rows */}
                        {ready||masterId? (                    
                            <MasterDetails  serviceFormData={formData} 
                                            forwardKey={forwardKey} 
                                            masterId={masterId}
                                            detailSubmitLink={detailSubmitLink}
                                            detailSubmitButton={detailSubmitButton}
                                            serviceAddFormData= {serviceAddFormData}
                                            backLink={backLink} 
                                            excludeFields={excludeFields}
                                            detailExcludeFields={detailExcludeFields}
                                            disabledFields={disabledFields}
                                            lnk={lnk+detail}
                                            detailLink={detailLink}
                                            detail={detail}
                                            entryView={entryView}
                                            detailChild={detailChild}
                                            title={title}
                                            subDetailId={subDetailId}
                                            masterCode={masterCode} 
                                            masterCodeValue={detail === undefined?getParentsFormValues(formData, masterCode):null} 
                                            masterFields={masterFields}
                                            masterDefaultValues={masterDefaultValues}
                                            masterLocalLovMap={localLovMapRef}
                                            autoFill= {autoFill}
                                            autoFillLink= {autoFillLink}
                                            autoFillParent= {autoFillParent}
                                            showInitialData={showInitialData}
                                            />
                        ):null}
                    </form>  
                </Space>         	
            </div>
        );

    function saveMaster() {
        const obj = tabData.reduce((o, key) => ({ ...o, [key]: formData[key] }), {});
        setBackReady(false);
        const saveLink = 'http://localhost:9002/hms/'+masterLink;

        axios
            .post(saveLink, obj, { headers })
            .then((res) => {
                setFormData((prev) => ({ ...prev, id: res.data.id }));//setFormData((prev) => ({ ...prev, [forwardKey]: res.data.id }));
                setBackReady(true);
                setMasterId(masterId?masterId:res.data.id)
            })
            .catch((error) => {
                alert(error.response?.data);
                if (Array.isArray(error.response?.data)) {
                    message.error(error.response.data.join(", "));
                } else if (error.response?.data?.message) {
                    message.error(error.response.data.message);
                } else {
                    message.error("An error occurred");
                }
            });
    }

    async function getMaster(backId) { 
        try {
                const res = await axios.get(`${masterLink}/${backId}`, { headers }); 
                //setTabDataValues(res.data);
                setTabData(Object.keys(res.data)); 
                setFormData(res.data);
                setBackReady(true); 
            }catch (error) { 
                console.warn("response", error.response?.data); 
            } 
    }

    async function getMasterByCode(masterCodeValue) { 
        try {
            setBackReady(false);
            console.log(masterCodeValue)
            axios
            .get(`${masterLink}Code/${masterCodeValue}`, { headers })
            .then((res) => {
                setFormData((prev) => ({ ...prev, masterId: res.data.id }));
                setMasterId(res.data.id)
                setBackReady(true);
                console.log(res.data.id)
            })
             setBackReady(true);   
            }catch (error) { 
                console.warn("response", error.response?.data); 
            } 
    }

    async function populateMaster(){
        const keys = Array.isArray(tabDataFields) && tabDataFields.length > 0?tabDataFields:masterFields;

        let row =  (Array.isArray(tabDataFields) && tabDataFields.length > 0
                            ? normalizedInitialData[0]
                            : masterDefaultValues);
        const localLovMap = new Map();
    
        if (!row) return;
        const lovCols = keys.filter(  
        (key) =>
            typeof row[key] === "string" && row[key].includes(String.fromCharCode(31)) //filter fields that their value includes ascii char 31, they are the Lov fields
        );

        // 1) Build a local parent-child map (not state) 
        const localParentChildMap = new Map(); 

        for (const key of lovCols) { 
            const value = row[key]; 
            const parent = value.substring(value.indexOf(String.fromCharCode(31)) + 1).trim(); //get string after chr(13), it's parent
            if (parent) { 
                // parent can have multiple children; store as array 
                //const existing = localParentChildMap.get(parent) || []; 
                localParentChildMap.set(parent, key); 
            } 
        }

        // 3. Load root LOVs first
        for (const key of lovCols) {
            const value = row[key]; 
            const parent = value.substring(value.indexOf(String.fromCharCode(31)) + 1) .trim(); 
            if (!parent) { // Root LOV               
                const lov = await fetchInitLov(linkLov, key, headers, localLovMapRef);
                localLovMap.set(key, lov);
                localLovMapRef.current.set(key, lov);
            } 
        }

        // 4. Load child LOVs after roots are ready 
        for (const key of lovCols) { 
            const value = row[key];
            const parent = value.substring(value.indexOf(String.fromCharCode(31)) + 1).trim(); 
            if (parent) { 
                const lov = await lovInit(formData, key, localParentChildMap, headers, linkLov); 
                localLovMap.set(key, lov);
                localLovMapRef.current.set(key, lov);
            } 
        }

        // 5. Push final maps into React state 
        setLovMap(localLovMapRef.current); 
        setParentChildLovMap(localParentChildMap);

        keys.forEach((k)=>{
            if(k.endsWith("Date")){
               setDateCols((prev) => [...prev, k]); 
            }
        })  
    }
}