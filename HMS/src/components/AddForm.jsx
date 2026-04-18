import { Typography, Space, message, DatePicker} from 'antd';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router';
import dayjs from "dayjs";
import { getAccessToken } from "../functions/getAccessToken.js";
import {resolvePrimaryKey} from "../functions/resolvePrimaryKey.js";
import {  selectCodeDesc } from "../functions/selectCodeDesc.js";
import {  getLovData } from "../functions/getLovData.js";
import {  getCheckBoxData } from "../functions/getCheckBoxData.js";
import {  lovChange } from "../functions/lovChange.js";
import {isDateTime} from "../functions/isDateTime.js";
import { toSpacedWords } from "../functions/toSpacedWords.js";
import '../styles/page.css';

export function AddForm(props){
    const location = useLocation();
    const state = props.state || location.state || {};
    const masterId = state?state.masterId:props.masterId?props.masterId:null;
    const forwardKey = state?state.forwardKey:props.forwardKey;
    const accessToken = getAccessToken();    
    const serviceFormData = state.serviceFormData;
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
   // 
   // const [formData, setFormData] = useState(serviceFormData);
    //const obj = { ...tabData.reduce((o, key) => ({ ...o, [key]: formData[key] }), {}), serviceProductId: formData.serviceProductId };

    const tabData = state ? state.tabData : props.obj;

    const backLink = state ? state.backLink:props.backLink;
    const backId = state ? state.backId:props.backId;
    
    const tabDataValues = state ? state.initialData : props.obj;
    const formName = state ? state.page : props.name;
    const lnk = state ? state.lnk : props.lnk;
    //const excludeFields = state ? state.excludeFields:props.excludeFields;
    const detailExcludeFields = state.detailExcludeFields;
    const masterFields=state?state.masterFields:props.masterFields;
    const masterCode=state?state.masterCode:props.masterCode;
    const masterCodeValue=state?state.masterCodeValue:props.masterCodeValue;
    const masterLocalLovMap = state?state.masterLocalLovMap:props.masterLocalLovMap;
    const [disabledFields, setDisabledFields] = useState(state?state.disabledFields: null);
    const [excludeFields, setExcludeFields] = useState(state?state.excludeFields: null);
    const [initialLovApplied, setInitialLovApplied] = useState(false);  // used to stop infinit reloading when AddForm is invoked in the main tab
    const detail = props.detail;
    const noNavigate = state?state.noNavigate : null;
    //setFormData(prev => ({ ...prev, serviceProductId: tabDataValues?.serviceProductId ?? "" }));
    
    const navigate = useNavigate();
    const linkLov = "http://localhost:9002/hms/";
    const [lovMap, setLovMap] = useState(new Map());
    const [checkBoxMap, setCheckBoxMap] = useState([]);
    const [dateCols, setDateCols] = useState([]);
    const [parentChildLovMap, setParentChildLovMap] = useState(new Map());
    const link = "http://localhost:9002/hms/" + lnk;

    const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
        withCredentials: true,
    };

    const cancelClicked = () => navigate("/" + history.back());

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const obj = tabData.reduce((o, key) => ({ ...o, [key]: formData[key] }), {});

        try {
            const response = await axios.post(link, obj, { headers });

            // Now response.data contains the saved object
            if (props.onSaved) {
                console.log(response.data.id);
                props.onSaved(response.data.id);
            }

            if (!noNavigate) {
                if (backLink) {
                    if (backLink === 'back') {
                        navigate(-1, {
                            state: {
                                backId,
                                masterId,
                                excludeFields,
                                detailExcludeFields,
                                detail,
                                tabData,
                                rec: serviceFormData,
                                masterFields,
                                masterCode,
                                masterCodeValue,
                                masterLocalLovMap,
                                backLink,
                                title: formName,
                                from: formName
                            }
                        });
                    } else {
                        navigate("/" + backLink, {
                            state: {
                                backId,
                                masterId,
                                excludeFields,
                                detailExcludeFields,
                                detail,
                                tabData,
                                rec: serviceFormData,
                                masterFields,
                                masterCode,
                                masterCodeValue,
                                masterLocalLovMap,
                                backLink,
                                title: formName,
                                from: formName
                            }
                        });
                    }
                } else {
                    navigate("/" + lnk, {
                        state: { serviceFormData: obj }
                    });
                }
            }

            } catch (error) {
                alert(error.response?.data);
                if (Array.isArray(error.response?.data)) {
                    message.error(error.response.data.join(", "));
                } else if (error.response?.data?.message) {
                    message.error(error.response.data.message);
                } else {
                    message.error("An error occurred");
                }
            }
        };

  useEffect(() => {
    getLovData(tabData, tabDataValues, setParentChildLovMap, setLovMap, linkLov, headers, setDateCols);
    getCheckBoxData(tabData, tabDataValues, setCheckBoxMap)
  }, [tabData]);

  useEffect(() => {
    setDisabledFields(disabledFields)
  }, [disabledFields]);

    useEffect(() => {
        setExcludeFields(excludeFields)
    }, [excludeFields]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, [forwardKey]: masterId }));
  }, [forwardKey, tabDataValues]);

  useEffect(() => {
    if (!tabDataValues || Object.keys(tabDataValues).length === 0) return;

    const cleaned = {};
    Object.entries(tabDataValues).forEach(([key, value]) => {
        if (typeof value === "string" && value.includes(String.fromCharCode(31))) {
            cleaned[key] = value.substring(0, value.indexOf(String.fromCharCode(31)));
        } else {
            cleaned[key] = value;
        }
    });

    setFormData(prev => ({ ...prev, ...cleaned }));
}, [tabDataValues]);

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
                    {isLov ? ( 
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
                        <input type="text" id={fieldName} name={fieldName} value={formData[fieldName] ?? ""} disabled={disabledFields?.includes(fieldName)} onChange={handleChange} /> )} 
                </td> 
            </> 
        ); 
    };


    return ( 
        <div className="form-table"> 
            <Space size={15} direction="vertical"> 
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
                                    <td><button className="form-button" type="submit">Submit</button></td>
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