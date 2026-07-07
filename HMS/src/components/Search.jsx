import { DatePicker ,  Space, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState, useEffect } from 'react';
import { useLocation} from 'react-router';
import { getHeader } from "../functions/getHeader.js";
import {  lovChange } from "../functions/lovChange.js";
import { SearchDetails } from './SearchDetails.jsx';
import {  getLovData } from "../functions/getLovData.js";
import {  resolvePrimaryKey } from "../functions/resolvePrimaryKey.js";
import { toSpacedWords } from "../functions/toSpacedWords.js";
import '../styles/page.css';

export function Search(props) {
    const { state } = useLocation();    

    const [ready, setReady] = useState(false);
    const searchFields  = state ? state.searchFields    : props.searchFields;
    const searchValues  = state ? state.searchValues    : props.searchValues;
    const searchLink    = state ? state.searchLink      : props.searchLink;
    const formTabLink   = state ? state.formTabLink     : props.formTabLink;
    const formTabEntity = state ? state.formTabEntity   : props.formTabEntity;
    const lnk           = state ? state.lnk             : props.lnk;
    const title         = state ? state.title           : props.title?props.title:props.name;
    const disabledFields = state ? state.disabledFields : props.disabledFields;
    const excludeFields = state ? state.excludeFields   : props.excludeFields;

    const [tabData, setTabData] = useState(searchFields);   
    const [lovMap, setLovMap] = useState(new Map());
    const [parentChildLovMap, setParentChildLovMap] = useState(new Map());//create map that holds the parent child
    const [dateCols, setDateCols] = useState([]);
    
    const [searchCriteria, setSearchCriteria] = useState({});
    
    const headers = getHeader();
    const linkLov = "http://localhost:9002/hms/";
    const [formData, setFormData] = useState({});  
    
    

    useEffect(() => {
            getLovData(tabData, searchValues, setParentChildLovMap, setLovMap, linkLov, headers, setDateCols);
        }, [searchValues]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setSearchCriteria(prev => ({ ...prev, [name]: value }));
    };

    const handleLovChange = (event) => {
        setReady(false);
        const { name, value } = event.target;         
        const updatedFormData = { ...formData, [name]: value }; // Build the updated formData manually
        setFormData(updatedFormData);
        setSearchCriteria(prev => ({ ...prev, [name]: value }));
        lovChange(updatedFormData, name, parentChildLovMap, setLovMap, headers, linkLov);
        // This runs for ALL LOV fields, including root
        setLovMap((prev) => {
            const updated = new Map(prev);
            //localLovMapRef.current = updated;
            return updated;
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setReady(true);     
    };

    // Build pairs for 2-column layout 
    const fieldPairs = [];
    for (let i = 0; i < searchFields.length; i += 2){ 
        fieldPairs.push(searchFields.slice(i, i + 2));
    }

    // Helper to render label + input cells 
    const renderFieldCells = (fieldName) => { 
        const isLov = lovMap.has(fieldName) ; 
        const isDate = dateCols.includes(fieldName);

        return ( 
                <> 
                    <td className="label-cell"> <label>{toSpacedWords(fieldName)}:</label> </td> 
                    <td className="input-cell"> 
                        {isLov ? ( 
                            <select name={fieldName} value={formData[fieldName] ?? ""} onChange={handleLovChange} className="selectInput" > 
                                <option value="">-- Select --</option> 
                                {Array.from(lovMap.get(fieldName)  || []).map((opt) => ( 
                                    <option value={resolvePrimaryKey(opt)}> {opt.name || opt.username || opt.description} 
                                    </option> 
                                ))} 
                            </select> ) 
                        : isDate ? ( 
                            <DatePicker id={fieldName} 
                                        name={fieldName} 
                                        value={formData[fieldName] ? dayjs(formData[fieldName], "YYYY-MM-DD") : null} 
                                        format="MM/DD/YYYY" 
                                        onChange={(date) => setFormData((prev) => ({ ...prev, [fieldName]: date ? date.format("YYYY-MM-DD") : null })) } 
                                        className="dateField" /> )  
                        : ( 
                            <input type="text" id={fieldName} name={fieldName} value={formData[fieldName] ?? ""}  onChange={handleChange} /> )} 
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
                                    <td><button className="form-button" type="submit">Search</button></td>
                                </tr>
                            </tbody>
                        </table>
                        {/* ✅ Render the Search Detail rows */}
                        
                        {ready? (                    
                            <SearchDetails  searchCriteria={searchCriteria} 
                                            lnk={lnk}
                                            searchLink={searchLink}
                                            title={title}
                                            formTabLink={formTabLink}
                                            formTabEntity={formTabEntity}
                                            disabledFields={disabledFields}
                                            excludeFields={excludeFields}
                            />
                        ):null}
                    </form>  
                </Space>         	
            </div>
        );
    }