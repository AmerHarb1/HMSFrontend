import { Typography, Space, message, DatePicker} from 'antd';
import {  fetchRecordById } from "../functions/fetchRecordById.js";
import { useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router';
import dayjs from "dayjs";
import { GenericAutoFill } from './GenericAutoFill.jsx';
//import { ProductAutoFill } from './ProductAutoFill';
import { getAccessToken } from "../functions/getAccessToken.js";
import {resolvePrimaryKey} from "../functions/resolvePrimaryKey.js";
import {  selectCodeDesc } from "../functions/selectCodeDesc.js";
import {  getLovData } from "../functions/getLovData.js";
import {  getCheckBoxData } from "../functions/getCheckBoxData.js";
import {  lovChange } from "../functions/lovChange.js";
import {isDateTime} from "../functions/isDateTime.js";
import { toSpacedWords } from "../functions/toSpacedWords.js";
import { getHeader } from "../functions/getHeader.js";
import '../styles/page.css';

export function GetForm(props){
    const location = useLocation();
    const state = props.state || {};

    const navState = location.state || {};

    const accessToken = getAccessToken(); 
    const [formData, setFormData] = useState(() => { 
        const schema = state.tabData || [];
        const raw = state.initialData || {};

        // Build formData from raw record (so LOV engine sees ASCII‑31)
        const base = schema.reduce((a, key) => ({
            ...a,
            [key]: raw[key] ?? ""
        }), {});

        return base;
    });


    const tabData = state ? state.tabData : props.obj;
    const tabDataValues = state ? state.initialData : props.obj;

    const submitButton = state ? state.submitButton:props.submitButton;
    const search = state ? state.search : null;

    
    const formName = state ? state.page : props.name;
    const lnk = state ? state.lnk : props.lnk;
    const searchLink = state ? state.searchLink : props.searchLink;
    //const excludeFields = state ? state.excludeFields:props.excludeFields;
    const id = state.id;
    
    const [disabledFields, setDisabledFields] = useState(state?state.disabledFields: null);
    const [excludeFields, setExcludeFields] = useState(state?state.excludeFields: null);
    const [initialLovApplied, setInitialLovApplied] = useState(false);  // used to stop infinit reloading when AddForm is invoked in the main tab    
    
    const navigate = useNavigate();
    const linkLov = "http://localhost:9002/hms/";
    const [lovMap, setLovMap] = useState(new Map());
    const [checkBoxMap, setCheckBoxMap] = useState([]);
    const [dateCols, setDateCols] = useState([]);
    const [parentChildLovMap, setParentChildLovMap] = useState(new Map());
    
    const autoFill = state?state.autoFill: null;
    const autoFillLink = state?state.autoFillLink: null;
    const base = (autoFill || "").replace(/Description$/, "");
    const autoFillId = base+'Id';
    const autoFillCode = base+'Code';
    const [initialAutoFill, setInitialAutoFill] = useState({});

    const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
        withCredentials: true,
    };

    const cancelClicked = () => navigate("/" + history.back());

    function searchClicked (){
        navigate("/"+search.searchLink, {
            state: {
                tabData: tabData,
                tabDataValues: tabDataValues,
                searchFields: ['PatientId','FirstName', 'LastName', 'BithDate'],
                searchValues: {PatientId: '', FirstName: '', LastName: '', BirthDate: ''},
                lnk: search.searchLink,
                searchLink: search.afterSearchLink,
                formTabLink: search.formTabLink,
                returnMode: search.returnMode,          // <— NEW
                returnField: search.formTabEntity     // <— NEW
            }
        })
    }

    useEffect(() => {
        if (navState?.selectedRecord && navState?.returnField) {
            setFormData(prev => ({
                ...prev,
                [navState.returnField]: navState.selectedRecord.id + ' - ' +navState.selectedRecord.person,
                ['searchId']: navState.selectedRecord.id
            }));
        }
    }, [navState.selectedRecord, navState.returnField]);

    
    async function handleSubmit () {
        event.preventDefault();        
        const response = await fetchRecordById(lnk, formData[id]);
        props.onSaved(response, formData['AppointmentDate']);
        if (typeof props.setSelectedDate === "function") {
            props.setSelectedDate(formData['AppointmentDate']);
        }if (typeof props.setClinic === "function") {
            props.setClinic(formData[id]);
        }
        if (typeof props.setPatientId === "function") {
            props.setPatientId(formData['searchId']);
        }
        if (typeof props.setPerson === "function") {
            props.setPerson(formData[navState.returnField]);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLovChange = (event) => {
        const { name, value } = event.target;         
        const updatedFormData = { ...formData, [name]: value }; // Build the updated formData manually
        setFormData(updatedFormData);
        lovChange(updatedFormData, name, parentChildLovMap, setLovMap, headers, linkLov);
    };

    useEffect(() => {
        getLovData(tabData, tabDataValues, setParentChildLovMap, setLovMap, linkLov, headers, setDateCols);
        getCheckBoxData(tabData, tabDataValues, setCheckBoxMap)
    }, [tabData]);

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
      //  if (initialLovApplied) return;                     // prevent loop
        if (!parentChildLovMap || parentChildLovMap.size === 0) return;
        if (!formData) return;

        // Only run once
        setInitialLovApplied(true);

        // Replay parent LOV changes
        Object.keys(formData).forEach((name) => {
            if (parentChildLovMap.has(name) && formData[name]) {
                lovChange(formData, name, parentChildLovMap, setLovMap, headers, linkLov);
            }
        });
    }, [parentChildLovMap]);

    // get fields to be displayed 
    const displayField = (tabData || []).filter(key=>{
        return  !(excludeFields && key in excludeFields); 
    }); 

    // Build pairs for 2-column layout 
    const fieldPairs = []; 
    for (let i = 0; i < displayField.length; i += 2){ 
        fieldPairs.push(displayField.slice(i, i + 2));
    }

    // Helper to render label + input cells 
    const renderFieldCells = (fieldName) => { 
        if (!fieldName || (excludeFields && fieldName in excludeFields)) { // not needed anymore
            return ( 
                <> 
                    <td className="label-cell empty"></td> 
                    <td className="input-cell empty"></td> 
                </> 
            ); 
        }

        const isLov = lovMap.has(fieldName) ; 
        const isDate = dateCols.includes(fieldName);
        const isBoolean = checkBoxMap.includes(fieldName);
        
        return ( 
            <> 
                <td className="label-cell"> <label>{toSpacedWords(fieldName)}:</label> </td> 
                <td className={`input-cell ${isBoolean ? "bool-cell" : ""}`}> 
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

                    :  isLov ? ( 
                        <select name={fieldName} value={formData[fieldName] ?? ""} disabled={disabledFields?.includes(fieldName)} onChange={handleLovChange} className="selectInput" > 
                            <option value="">-- Select --</option> 
                            
                            {Array.from(lovMap.get(fieldName)  || []).map((opt) => ( 
                                <option key={resolvePrimaryKey(opt)} value={selectCodeDesc(opt, formData[fieldName])}> {opt.name || opt.username || opt.description} 
                                </option> 
                            ))} 
                        </select> ) 
                    : isDate ? ( 
                        <DatePicker id={fieldName} 
                                    name={fieldName} 
                                    value={formData[fieldName]
                                            ? dayjs(
                                                formData[fieldName],
                                                isDateTime(headers[fieldName]) ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"
                                                )
                                            : null} 
                                    disabled={disabledFields?.includes(fieldName)} 
                                    format={isDateTime(headers[fieldName]) ? "MM/DD/YYYY HH:mm:ss" : "MM/DD/YYYY"}
                                    onChange={(date) => 
                                        setFormData((prev) => (
                                            { ...prev, [fieldName]: date
                                                    ? date.format(isDateTime(headers[fieldName]) 
                                                    ? "YYYY-MM-DD HH:mm:ss" 
                                                    : "YYYY-MM-DD") 
                                                : null 
                                            }
                                        )
                                    )} 
                                    className="dateField" /> ) 
                    : isBoolean ? (
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                className="checkBoxField"
                                id={fieldName}
                                name={fieldName}
                                checked={formData[fieldName] === true}
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
                        <div>
                            <input  type="text" 
                                    id={fieldName} 
                                    name={fieldName} 
                                    value={formData[fieldName] ?? ""} 
                                    disabled={disabledFields?.includes(fieldName)} onChange={handleChange} 
                            /> 
                            {search ? 
                                    search.formTabEntity === fieldName ? 
                                            
                                                <button className="form-button-field" onClick={searchClicked}>Search</button>
                                          
                                        :null
                                    : null
                            }
                        </div>
                        
                        
                    )} 
                </td> 
            </> 
        ); 
    };


    return ( 
        <div className="form-table"> 
            <Space size={10} direction="vertical"> 
                <Typography.Text className="Title">{formName}</Typography.Text> 
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
                                <div className="button-group">
                                    <td><button className="form-button" type="submit">{submitButton}</button></td>                                    
                                    <td><button className="form-button" onClick={cancelClicked}>Cancel</button></td>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Space>
        </div>
    );
}