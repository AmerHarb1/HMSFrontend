
import React from 'react';
import { useState, useEffect} from 'react';
import { Typography, Space, message, DatePicker} from 'antd';
import axios from 'axios';
import dayjs from "dayjs";
import { useNavigate, useLocation} from 'react-router';
import { GenericAutoFill } from './GenericAutoFill';
//import { ProductAutoFill } from './ProductAutoFill';
import { getAccessToken } from "../functions/getAccessToken.js";
import { fetchInitLov } from "../functions/fetchInitLov.js";
import {resolvePrimaryKey} from "../functions/resolvePrimaryKey.js";
import {fixFormDataLov} from "../functions/fixFormDataLov.js";
import {  lovChange } from "../functions/lovChange.js";
import {  getCheckBoxData } from "../functions/getCheckBoxData.js";
import {  normalizeBoolean } from "../functions/normalizeBoolean.js";
import {  lovInit } from "../functions/lovInit.js";
import { getHeader } from "../functions/getHeader";
import { toSpacedWords } from "../functions/toSpacedWords.js";
import {isDateTime} from "../functions/isDateTime.js";
import '../styles/page.css';

export function ModifyForm(props){
    const location = useLocation();
    const state = props.state || location.state || {};
    const accessToken = getAccessToken();

    const lnk =state?state.lnk:props.lnk;
    const  rec  = state?.rec || {};
    const [checkBoxMap, setCheckBoxMap] = useState([]);
    const [formData, setFormData] = useState(() => rec || {});

    const [lovMap, setLovMap] = useState(new Map());
    
    const [parentChildLovMap, setParentChildLovMap] = useState(() => new Map());
    
  //const apiLnk ='http://localhost:9002/hms/' +lnk+'/'+ (rec.id == null ? rec.code? rec.id:null:null);
    const apiLnk = `http://localhost:9002/hms/${lnk}/${resolvePrimaryKey(rec)}`;
    const createdBy = state.createdBy;
  	const createdOn = state.createdOn;
    const comments = state.comments;
	
    const tabDataValues = state ? state.initialData : props.obj;
    const initialData = Object.values(state.rec); 
    const backLink = state.backLink;   
    
    const tabData = state?state.tabData:props.obj;
    const formName =state?state.page:null;
    const localLovMap = new Map();
    const excludeFields=state.excludeFields;
    const linkLov = "http://localhost:9002/hms/";
    const [tabDataNoChar, setTabDataNoChar] = useState(initialData);
    const [dateCols, setDateCols] = useState([]);
    // find the row in tabDataValues that matches the current record
    const masterId = state?state.masterId : null;
    const backId = masterId;
    const detailExcludeFields = state.detailExcludeFields;
    const disabledFields = state?state.disabledFields: null;
    const masterFields=state?state.masterFields:props.masterFields;
    const masterCode=state?state.masterCode:props.masterCode;
    const masterCodeValue=state?state.masterCodeValue:props.masterCodeValue;
    const localLovMapRef = state?state.masterLocalLovMap:props.masterLocalLovMap;
    const entryView = state?state.entryView:null;
    const detail = state.detail;
    const serviceFormData = state.serviceFormData;
    const noNavigate = state?state.noNavigate : null;
    const autoFill = state?state.autoFill: null;
    const autoFillLink = state?state.autoFillLink: null;
    const base = (autoFill || "").replace(/Description$/, "");
    const autoFillId = base+'Id';
    const autoFillCode = base+'Code';
    const [initialAutoFill, setInitialAutoFill] = useState({});
    const navigate = useNavigate();
    const headers = getHeader();

console.log(formData);
    /*  Amer on 02/15/2026
        modify form is populated by setting formData to the rec state variable passed from addButton.
        tabData and tabDataValues are populated from tabData and initialData state variables
        getLovData function will be triggered to run when either tabData or tabDataValues values are changed this happens atleast once when the page is visited).
        getLovData uses formData, tabData and tabDataValues to populate the lovMap, ParentChildMap and dateCols, which are used in the HTML to build and populate the page.
    */
    
    const cancelClicked = () => {
        navigate("/" + history.back());
    };

    const handleChange = (event) => {
    	const { name, value } = event.target;
        console.log(name +' , '+ value)
    	setFormData((prevFormData) => ({  ...prevFormData,[name]: value }));   
  	};

    const handleLovChange = (event) => {
        const { name, value } = event.target;         
        const updatedFormData = { ...formData, [name]: value }; // Build the updated formData manually
        //console.log(name +' , '+ value)
        setFormData(updatedFormData);
        lovChange(updatedFormData, name, parentChildLovMap, setLovMap, headers, linkLov);
    };
    
    const updateClicked = (event) => {
  		event.preventDefault();
  		console.log(formData);
		const obj = tabData.reduce((o, key) => ({ ...o, [key]: key=="id"?rec.id
                                                        :key=="code"?rec.code
                                                        :key=="pk"?rec.pk.code
														:key=="createdBy"?createdBy
														:key=="createdon"?createdOn
                                                        :key=="comments"?comments
														: formData[key]
                                                }), {})//Object.assign({}, ...Object.entries({...formObj}).map(([a,b]) => ({ [b]: formData[b] })))							
                                                  
	  	const response =  axios.put(apiLnk,obj,{headers: headers}
  				).then(() => {

                    if (props.onSaved) {
                        props.onSaved();
                    }

                    if(!noNavigate){
                        if (backLink) {
                            if(backLink === 'back'){
                                navigate(-1, { 
                                                    state: { 
                                                        backId: backId, 
                                                        masterId: masterId,
                                                        excludeFields: excludeFields, 
                                                        detailExcludeFields: detailExcludeFields,
                                                        detail: detail,
                                                        tabData:tabData,
                                                        rec: serviceFormData,
                                                        masterFields: masterFields,
                                                        masterCode: masterCode,
                                                        masterCodeValue:masterCodeValue,
                                                        masterLocalLovMap:localLovMapRef,
                                                        backLink:backLink,
                                                        title:formName,
                                                        entryView:entryView,                                
                                                        from: formName } 
                                                        });
                            }else{
                                navigate("/" + backLink, { 
                                    state: { 
                                        backId: backId, 
                                        masterId: masterId,
                                        excludeFields: excludeFields, 
                                        detailExcludeFields: detailExcludeFields,
                                        detail: detail,
                                        tabData:tabData,
                                        rec: serviceFormData,
                                        masterFields: masterFields,
                                        masterCode: masterCode,
                                        masterCodeValue:masterCodeValue,
                                        masterLocalLovMap:localLovMapRef,
                                        backLink:backLink,
                                        title:formName, 
                                        entryView:entryView,                               
                                        from: formName } 
                                    
                                });
                            } 
                        } else 
                            { 
                                navigate("/" + lnk, { 
                                    state: { serviceFormData: obj } 
                                });
                        }
                    }
                })
  				  .catch((err) => {
                    navigate("/exception", {
                        state: {
                        message: err.response?.data?.message,
                        stackTrace: err.response?.data?.stackTrace,
                        exceptionDate: err.response?.data?.exceptionDate
                        }
                    });               
                  });
	};
	
	const deleteClicked = (event) => {
  		event.preventDefault();
  		var answer = window.confirm("Are you sure you want to Delete data?");
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
    
    const getLovData = async() => {
        const keys = tabData;
        const row = Array.isArray(tabDataValues) && tabDataValues.length > 0 && typeof tabDataValues[0] === "object" && !Array.isArray(tabDataValues[0]) ? tabDataValues[0] : tabDataValues;// if tabDataValues is an array of objects, then get the first object but if it's an object then get it back 
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
                //console.log(key)
                // parent can have multiple children; store as array 
                const existing = localParentChildMap.get(parent) || []; 
                //console.log(existing)
                localParentChildMap.set(parent, [...existing, key]);    //localParentChildMap.set(parent, key);
            } 
        }

        // 3. Load root LOVs first
        for (const key of lovCols) {
            const value = row[key]; 
            const parent = value.substring(value.indexOf(String.fromCharCode(31)) + 1) .trim(); 
            if (!parent) { // Root LOV
                const lov = await fetchInitLov(linkLov, key, headers, row[key].split(String.fromCharCode(31))[0]);
                localLovMap.set(key, lov);
            } 
        }

        // 4. Load child LOVs after roots are ready 
        for (const key of lovCols) { 
            const value = row[key]; 
            const parent = value.substring(value.indexOf(String.fromCharCode(31)) + 1).trim(); 
            if (parent) { 
                const lov = await lovInit(formData, key, localParentChildMap, headers, linkLov); 
                localLovMap.set(key, lov);
            } 
        }
        //console.log(localLovMap);
        // 5. Push final maps into React state 
        setLovMap(localLovMap); 
        setParentChildLovMap(localParentChildMap);

        keys.forEach((k)=>{
            if(k.endsWith("Date")){
               setDateCols((prev) => [...prev, k]); 
            }
        })   
    };

    useEffect(() => {
        if (!formData) return;
        if (!formData[autoFillId] && !formData[autoFill]) return;

        setInitialAutoFill({
            autoFillObjId: formData[autoFillId],
            autoFillObjCode: formData[autoFillCode],
            autoFillObjDescription: formData[autoFill]
        });
    }, [formData, autoFillId, autoFillCode, autoFill]);

useEffect(() => { 
        (async () => { 
            await getLovData(); 
            getCheckBoxData(tabData, tabDataValues, setCheckBoxMap)
        })(); 
    }, [tabData, tabDataValues]);


    useEffect(() => {
        // Wait until checkBoxMap is populated
        if (!checkBoxMap || checkBoxMap.length === 0) return;
        setFormData(prev => {
            const next = { ...prev };
            checkBoxMap.forEach(field => {
                next[field] = normalizeBoolean(prev[field]);
            });
           // console.log("Normalized booleans:", next);
            return next;
        });
    }, [checkBoxMap]);

    useEffect(() => {
        fixFormDataLov(lovMap, formData, tabData, setFormData, checkBoxMap);
  }, [lovMap]);
    
    useEffect(() => {
        const cleaned = {};
        Object.entries(state.rec).forEach(([key, value]) => {
            if (typeof value === "string" && value.includes(String.fromCharCode(31))) {
                cleaned[key] = value.substring(0, value.indexOf(String.fromCharCode(31)));
            } else {
                cleaned[key] = value;
            }
        });
        setTabDataNoChar(cleaned);
    }, [tabData]);     

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

        const isLov = lovMap.has(fieldName) || lovMap.has(localLovMap); 
        const isDate = dateCols.includes(fieldName);
        const isBoolean = checkBoxMap.includes(fieldName);

        return ( 
            <> 
                <td className="label-cell"> <label>{toSpacedWords(fieldName)}:</label> </td> 
                <td className="input-cell"> 
                    {autoFill && fieldName === autoFill ?
                            <GenericAutoFill
                                value={initialAutoFill}    // <-- send initial value
                                autoFillLink={autoFillLink}
                                labelField="autoFillObjDescription"
                                onSelect={(product) => {
                                    if (!product) return;
                                    //{console.log(product.productDescription)}
                                    // 1) update formData for saving
                                    setFormData((prev) => ({    
                                    ...prev,
                                    [autoFillId]: product.autoFillObjId,
                                    [autoFillCode]: product.autoFillObjCode,
                                    [autoFill]: product.autoFillObjDescription
                                    }));   
                                    
                                    // 2) update initialProduct so the UI reflects the new selection
                                    setInitialAutoFill({
                                        autoFillObjId: formData[autoFillId],
                                        autoFillObjCode: formData[autoFillCode],
                                        autoFillObjDescription: formData[autoFill]
                                    });
                                }}
                            />

                    : isLov ? 
                        <select name={fieldName} value={formData[fieldName] ?? ""} disabled={disabledFields?.includes(fieldName)} onChange={handleLovChange} className="selectInput" > 
                            <option value="">-- Select --</option> 
                            {Array.from(lovMap.get(fieldName) || localLovMap.get(fieldName) || []).map((opt) => ( 
                                <option value={resolvePrimaryKey(opt)}> {opt.name || opt.username || opt.description} 
                                </option> 
                            ))} 
                        </select> 
                    : isDate ? ( 
                        <DatePicker id={fieldName} 
                                    name={fieldName} 
                                    value={formData[fieldName]
                                        ? dayjs(
                                            formData[fieldName],
                                            isDateTime(formData[fieldName]) ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"
                                            )
                                        : null}  
                                    disabled={disabledFields?.includes(fieldName)} 
                                    format={isDateTime(formData[fieldName]) ? "MM-DD-YYYY HH:mm:ss" : "MM-DD-YYYY"}
                                    onChange={(date) => 
                                        setFormData((prev) => (
                                            { ...prev, [fieldName]: date
                                                 ? date.format(isDateTime(formData[fieldName]) 
                                                    ? "YYYY-MM-DD HH:mm:ss" 
                                                    : "YYYY-MM-DD") 
                                                : null 
                                            }
                                        )
                                    )} 
                                    //onChange={(date) => setFormData((prev) => ({ ...prev, [fieldName]: date ? date.format("YYYY-MM-DD") : null })) } 
                                    className="dateField" /> ) 
                    : isBoolean ? (
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                className="checkBoxField"
                                id={fieldName}
                                name={fieldName}
                                checked={Boolean(formData[fieldName])}
                                disabled={disabledFields?.includes(fieldName)}
                                onChange={(e) =>
                                    setFormData(prev => {
                                        const next = {
                                            ...prev,
                                            [fieldName]: e.target.checked
                                        };
                                        //console.log("onChange:", fieldName, "checked =", e.target.checked, "stored =", next[fieldName]);
                                        return next;
                                    })
                                }
                            />
                        </div>
                    )
                    : ( 
                        <input type="text" id={fieldName} name={fieldName} value={formData[fieldName] ?? ""} disabled={disabledFields?.includes(fieldName)} onChange={handleChange} /> )} 
                </td> 
            </> 
        ); 
    };



    return ( 
        <>
            {autoFill ? 
                        <div className="AutoFillSection">
                            {autoFill}
                        </div> 
                    : null
            }
            <div className="form-table"> 
                <Space size={15} direction="vertical"> 
                    {formName ? 
                        <Typography.Text className="Title">{formName}</Typography.Text> 
                    : null
                    }
                    <form> 
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
                                    <td colSpan={4}> 
                                        <div className="button-group"> 
                                            <button className="form-button" onClick={updateClicked}>Update</button> 
                                            <button className="form-button" onClick={deleteClicked}>Delete</button> 
                                            <button className="form-button" onClick={cancelClicked}>Cancel</button> 
                                        </div> 
                                    </td> 
                                </tr>

                            </tbody>
                        </table>
                    </form>
                </Space>
            </div>
        </>
    );
}