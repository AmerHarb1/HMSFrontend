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
    const [ready, setReady] = useState(false);
    const [backReady, setBackReady] = useState(false);
    const masterFields = state?state.masterFields:props.masterFields; 
    const tabDataFields = (state?.tabData && typeof state.tabData === "object") ? state.tabData : (props.tabData && typeof props.tabData === "object") ? props.tabData : {};
    const [tabData, setTabData] = useState(state?state.tabData:masterFields ? masterFields : props.masterFields?props.masterFields:state.masterFields);    
    const masterDefaultValues = state?state.masterDefaultValues:props.masterDefaultValues;    
    const [lovMap, setLovMap] = useState(new Map());
    const [parentChildLovMap, setParentChildLovMap] = useState(new Map());//create map that holds the parent child
    const [dateCols, setDateCols] = useState([]);
    const [serviceFormData, setServiceFormData] = useState(state?.serviceFormData ?? {});
    const [serviceAddFormData, setServiceAddFormData] = useState(state?.serviceFormData ?? {});
    const [masterId, setMasterId] = useState(state?state.masterId : null);
    const headers = getHeader();
    const linkLov = "http://localhost:9002/hms/";
    const lnk = props.lnk?props.lnk:state.lnk;
    const backLink = state?state.backLink:lnk;
    const detail = props.detail?props.detail:state?state.detail:null;
    const title = props.title?props.title:state.title;
    const masterCode = props.masterCode?props.masterCode:state?state.masterCode:null;
    const masterCodeValue = props.masterCodeValue?props.masterCodeValue:state?state.masterCodeValue:null;
    const masterLocalLovMap = state?state.masterLocalLovMap:{}; 
    const forwardKey = state?state.forwardKey: props.forwardKey;
    const initialData = state?state.initialData: props.initialData;
    //const tabData = ['productType', 'productDivision', 'productGroup', 'productCategory', 'itemNumber'];
    const excludeFields = state?.excludeFields ?? props.excludeFields; 
    const detailExcludeFields = state?.detailExcludeFields ?? props.detailExcludeFields;
    const disabledFields = state?state.disabledFields: props.disabledFields;
    const rec = JSON.parse(JSON.stringify(state?state.rec ?? {}:{}));
    const [formData, setFormData] = useState(rec);    
    let backId = state?state.backId:formData.id;
    const detailChild = state?state.detailChild:null;
    const createdBy = state?state.createdBy:{};
  	const createdOn = state?state.createdOn:null;
    const comments = state?state.comments:null;
    const detailLink = state?state.detailLink:props.detailLink;
    const entryView = state?state.entryView:props.entryView;
    const updateMaster = state?state.updateMaster:props.updateMaster;
    const apiLnk = `http://localhost:9002/hms/${lnk}/${masterId}`;
    const navigate = useNavigate();

     if(masterLocalLovMap !== undefined && masterLocalLovMap.current !== undefined && masterLocalLovMap.current.size > 0){        
         localLovMapRef.current = new Map(masterLocalLovMap.current);// If parent passed a ref, copy its contents, but DO NOT replace the ref object
        console.log(localLovMapRef.current)
     }

    useEffect(() => {
        if (localLovMapRef.current === null) {
            localLovMapRef.current = new Map();
        }

        if (masterLocalLovMap?.current instanceof Map) {
            localLovMapRef.current = new Map(masterLocalLovMap.current);
        }
    }, []);
console.log('backId = '+backId+'  masterId = '+masterId)
    useEffect(() => { 
        const run = async () => { 
            console.log('Here10')
            setBackReady(false);  
            if (backId || masterId) { 
                if(localLovMapRef === undefined || localLovMapRef.current === undefined || localLovMapRef.current.size === 0){
                    console.log('Here1')
                    await populateMaster(formData);
                }else{
                    console.log('Here2')
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
    
    const masterLink = 'http://localhost:9002/hms/'+lnk;

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
        if(detail !== undefined && detail !== null && detail !== ""){   //real Master Detail
            if(localLovMapRef === undefined || localLovMapRef.current === undefined || localLovMapRef.current.size === 0){
                const run = async () => {                     
                    await populateMaster();        
                }; 
                run();
            }
            saveMaster();
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
                            <select name={fieldName} value={formData[fieldName] ?? ""} disabled={disabledFields?.includes(fieldName)} onChange={handleLovChange} className="selectInput" > 
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
                                        disabled={disabledFields?.includes(fieldName)} format="MM/DD/YYYY" 
                                        onChange={(date) => setFormData((prev) => ({ ...prev, [fieldName]: date ? date.format("YYYY-MM-DD") : null })) } 
                                        className="dateField" /> ) 
                        : ( 
                            <input type="text" id={fieldName} name={fieldName} value={formData[fieldName] ?? ""} disabled={disabledFields?.includes(fieldName)} onChange={handleChange} /> )} 
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
                                    {entryView !== "view"?
                                    <td><button className="form-button" type="submit">Get Details</button></td>:null}

                                    {entryView === "view" && updateMaster !== "no"?  
                                    <td><button className="form-button" onClick={updateClicked}>Update</button></td>:null}
                                    {masterId && entryView !== "view"?
                                        <div>
                                            <td><button className="form-button" onClick={updateClicked}>Update</button></td>
                                            <td><button className="form-button" onClick={deleteClicked}>Delete</button></td>
                                        </div>
                                    :null}
                                </tr>
                            </tbody>
                        </table>
                        {/* ✅ Render the Detail rows */}
                        {ready||masterId? (                    
                            <MasterDetails  serviceFormData={formData} 
                                            forwardKey={forwardKey} 
                                            masterId={masterId}
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
                                            masterCode={masterCode} 
                                            masterCodeValue={detail === undefined?getParentsFormValues(formData, masterCode):null} 
                                            masterFields={masterFields}
                                            masterDefaultValues={masterDefaultValues}
                                            masterLocalLovMap={localLovMapRef}/>
                        ):null}
                    </form>  
                </Space>         	
            </div>
        );

    function saveMaster() {
        const obj = tabData.reduce((o, key) => ({ ...o, [key]: formData[key] }), {});
        setBackReady(false);
        console.log(obj)
        console.log(masterLink)

        axios
            .post(masterLink, obj, { headers })
            .then((res) => {
                setFormData((prev) => ({ ...prev, [forwardKey]: res.data.id }));
                setBackReady(true);
                setMasterId(res.data.id)
                console.log(res.data)
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
                            ? initialData[0]
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