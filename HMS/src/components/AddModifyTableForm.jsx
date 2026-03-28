import { Table, message, Space} from 'antd';
import axios from 'axios';
import React,{ useState, useEffect, useMemo} from 'react';
import { AddButton } from './AddButton';
import '../styles/page.css';
import 'antd/dist/reset.css'; // for AntD v5
import { AddForm } from '../components/AddForm';
import { ModifyForm } from '../components/ModifyForm';
import {formatDate} from '../functions/formatDateVal.js';
import { getValueType } from '../functions/getValueType.js';
import { getHeader } from "../functions/getHeader";
import { toSpacedWords } from "../functions/toSpacedWords.js";
import { PlusOutlined } from '@ant-design/icons';


export function AddModifyTableForm(props){
    const [loading, setloading ] = useState(true);
    const [addForm, setAddForm ] = useState(false);
    const [modifyForm, setModifyForm] = useState(null);
    const headers = getHeader();
    const [tabData, setTabData] = useState([]);
    const [tabDataNoChar, setTabDataNoChar] = useState([]);
    const [tabColumns, setTabColumns] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setpPage] = useState(0);
    const [pageSize, setpPageSize] = useState(10);
    const [sortField, setSortField] = useState('');//chaged to comments from id, because all tables have field comments but not id
    const [sortOrder, setSortOrder] = useState('asc');
    const [tableExcludeFields] = useState(props.tableExcludeFields ?? {});//used to exclude fields from showing in the table display
    const [formData, setFormData] = useState({});
    
    
    const excludeFields = props.excludeFields?props.excludeFields:{id: '', createdBy: '', createdDate: ''};
    
    const detailExcludeFields = props.detailExcludeFields;
    const lnk = props.lnk;
    const lnkId = props.lnkId;    //used with Tabs to pass an id to the api to get data for that id
    const disabledFieldsRaw = props.disabledFields; 
    const disabledFields = Array.isArray(disabledFieldsRaw) ? disabledFieldsRaw : Object.keys(disabledFieldsRaw || {}); // if you used object-as-set    //used to dislay the included fields as disabled
    const entryView = props.entryView;         
    const modifyView = props.modifyView;
  	const actionLink = props.lnk+'/add';
    const modifyLink = props.lnk+'/modify';    

    const getData = async(page, pageSize, sortField, sortOrder,lnkId, filters={}) => {
        setloading(true);
        //console.log('page = ' + page +' pageSize = ' + pageSize + ' sortField = ' + sortField + '  sortOrder = ' + sortOrder);

        // Build filter query string
        const filterParams = Object.entries(filters)
            .filter(([_, value]) => value && value.length > 0)
            .map(([key, value]) => `${key}=${value.join(",")}`)
            .join("&");

        const link = 'http://localhost:9002/hms/'+lnk + 'Get' + '?page=' + page + '&size=' + pageSize+ '&sort=' + sortField+ ',' + sortOrder + '&filterParams=' + filterParams ;	

        axios.post(link,lnkId,{headers: headers}
            ).then(res => {                                
                setTabData(res.data.content);   //res.data.content is an array of objects
                setFormData(res.data.content);
                setTotalPages(res.data.totalPages);
                setTotalRecords(res.data.totalElements);

                })
            .catch((error) => {
                console.warn("response", error.response?.data);                
            })
            .finally(()=>{
                setloading(false);
        });
    }

    useEffect(() => {
	    getData(0,10,'','asc',lnkId);
	  }, []);

    // build columns whenever data or sort state changes
    useEffect(() => {
        console.log(tabData)
        if (tabData.length > 0) {
        //    setTabDataNoChar(tabData);
            const cols = Object.keys(tabData[0])
                .filter((key) => {
                    const type = getValueType(tabData[0][key]);
                    return type !== "other" && !(key in tableExcludeFields);   // 👈 exclude non simple types 
                })
                .map((key) => {
                    const col = {
                        title: key,
                        dataIndex: key,
                        key,
                        sorter: true,
                        sortOrder:
                        sortField === key
                            ? sortOrder === "asc"
                            ? "ascend"
                            : "descend"
                            : null,
                        filters: buildFilters(tabData, key),
                        onFilter: (value, record) => record[key] === value,
                    };  
                    // Format dates
                    if (/^\d{4}-\d{2}-\d{2}T*/.test(tabData[0][key])) {
                    col.render = (text) => formatDate(text);
                    }
                    
                    const buildModifyState = (record) => ({
                        tabData: Object.keys(tabData[0]),
                        initialData: tabData[0],
                        rec: record,
                        name: record.id ?? record.code,
                        lnk,
                        noNavigate: true,
                        disabledFields,
                        excludeFields,
                        detailExcludeFields
                    });

                    // 👇 Add hyperlink rendering for IDs
                    if (modifyView !== "view" && (key === "id" || key==="code")) {
                        col.render = (text, record) => {
                            let display =
                                text ??    
                                record.id ??
                                record.code ??
                                record.pk?.code ??
                                "";                         

                            return(
                                <a  class='AddLinkButton'  
                                
                                    onClick={() => {
                                        setModifyForm(buildModifyState(record));
                                        getData(0,10,'','asc',lnkId);
                                        
                                    }}
                                                                    >
                                    {display}

                                </a>
                            );
                    }
                }
                return col;
            });
            const spacedCols = cols.map(col => ({ ...col, title: toSpacedWords(col.title) }));
            setTabColumns(spacedCols);
        }
    }, [tabData, sortField, sortOrder, tableExcludeFields]);

    const addClicked = async (event) => {
        event.preventDefault();        
        setAddForm(true);
    };

    useEffect(() => {
	//    console.log('totalPages =' + totalPages);
	  }, [totalPages]);
    useEffect(() => {
	//    console.log('totalRecords =' + totalRecords);
	  }, [totalRecords]);

    useEffect(() => {
        if (!Array.isArray(tabData)) return;
        const cleaned = tabData.map(row => {        //Builds a new cleaned array (cleaned) by iterating over the array and then over each object’s keys
            const newRow = {};                      
            Object.entries(row).forEach(([key, value]) => {     //Loops through each field (key → value) in that record.
                if (typeof value === "string" && value.includes(String.fromCharCode(31))) {
                    newRow[key] = value.substring(0, value.indexOf(String.fromCharCode(31)));   //If the value contains ASCII 31, it strips everything after it.
                } else {
                    newRow[key] = value;
                }
            });
            return newRow;
        });
        setTabDataNoChar(cleaned);  //Updates tabDataNoChar with the cleaned version.
	}, [tabData]);

    //extracts unique values for each field from your dataset.
    function buildFilters(data, field) {
        const uniqueValues = [...new Set(data.map(item => item[field]))];
        return uniqueValues
            .filter(val => val !== undefined && val !== null) // skip nulls
            .map(val => ({ text: String(val), value: val }));
    }

    const addState = useMemo(() => {
        if (!Array.isArray(tabData) || tabData.length === 0) {
            return null; // or {}
        }

        return {
            tabData: Object.keys(tabData[0]),   // schema
            initialData: tabData[0],               // record(s)
            bodyData: tabData[0],
            lnk,
            noNavigate: true,
            disabledFields,
            excludeFields: {
                id: '',
                createdBy: '',
                createdDate: ''
            }
        };
    }, [tabData]);
	
    return(
        <div>
            <Space size={15} direction="vertical">
                {console.log(addForm + ' - ' + modifyForm)}
                {!addForm && !modifyForm?
                <Table
                    className="Tab"
                    columns={tabColumns}
                    dataSource={tabDataNoChar}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: pageSize,
                        current: page + 1,          // AntD is 1-based, backend is 0-based
                        total: totalRecords,        // use total number of records, not totalPages
                        showSizeChanger: false,      // 👈 prevents AntD from changing pageSize
                    }}
                    onChange={(pagination, filters, sorter) => {
                        const field = sorter.field?sorter.field:"";
                        const order = sorter.field?sorter.order === "ascend" ? "asc" : "desc":"";

                        setSortField(field);
                        setSortOrder(order);
                        // update local state
                        setpPage(pagination.current - 1);
                        setpPageSize(pagination.pageSize);
                        // call backend with new sort
                        getData(pagination.current - 1, pagination.pageSize, field, order, filters);                        
                    }}
                >
                </Table>
               :null
                }
               {addForm && !modifyForm
                    ?
                        <AddForm state={addState} onSaved={() => {
                        setAddForm(false);
                        getData(0,10,'','asc',lnkId);
                    }}/>
                    :!modifyForm
                        ?
                            <button className="form-button" onClick={addClicked}>Add</button>
                        :null
                }
                {modifyForm && !addForm &&(
                    <ModifyForm
                        state={modifyForm}
                        
                        onSaved={() => {
                            console.log(addForm + ' - ' + modifyForm); 
                            setModifyForm(null);
                            getData(0,10,'','asc',lnkId);}}
                    />
                )}
                                
            </Space>
        </div>
    );
}