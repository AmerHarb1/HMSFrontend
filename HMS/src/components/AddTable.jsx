import { Table, Typography, Space} from 'antd';
import axios from 'axios';
import React,{ useState, useEffect} from 'react';
import { AddButton } from './AddButton';
import '../styles/page.css';
import 'antd/dist/reset.css'; // for AntD v5
//import {isDate} from '../functions/isDate.js';
import {formatDate} from '../functions/formatDateVal.js';
import { getValueType } from '../functions/getValueType.js';
import { getHeader } from "../functions/getHeader";
import { toSpacedWords } from "../functions/toSpacedWords.js";
import { PlusOutlined } from '@ant-design/icons';


export function AddTable(props){
//    console.log('in Add table' +props.name);
//    console.log(props.lnk);
    const [loading, setloading ] = useState(true);
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
    
    const excludeFields = props.excludeFields?props.excludeFields:{id: '', createdBy: '', createdDate: ''};

    const masterFields = props.masterFields;
    const masterDefaultValues = props.masterDefaultValues;
    const detailExcludeFields = props.detailExcludeFields;
    const forwardKey = props.forwardKey;
    const detail = props.detail;
    const pageTitle = props.name;
    const backLink = props.backLink;
    const lnk = props.lnk;
    const lnkId = props.lnkId;    //used with Tabs to pass an id to the api to get data for that id
    const formTabLink = props.formTabLink;    //used with Tabs as the link with an id to the api to get data for that id
    const formTabEntity = props.formTabEntity;    //used to identify the entity of the record 
    const disabledFieldsRaw = props.disabledFields; 
    const disabledFields = Array.isArray(disabledFieldsRaw) ? disabledFieldsRaw : Object.keys(disabledFieldsRaw || {}); // if you used object-as-set    //used to dislay the included fields as disabled

    
    const detailLink = props.detailLink;        //used in master detail to retrieve the detail data where some List Master pages are not the real or strait master (e.g., Approve Material Request).
    const entryView = props.entryView;          //used with value view to not disply the add button on table and master detail
    const modifyView = props.modifyView;         //used with value view to not disply the modify link on table and master detail
    const updateMaster = props.updateMaster;    //used to determine if update buttons shows for master
  	const actionLink = props.lnk+'/add';
    const modifyLink = props.lnk+'/modify';
    const detailChild = props.detailChild;      //for a child of master detail pages, where the enry and modification need to be on the child fields and the master detail id is one of the child fields (e.g., Product Issuance). 
     
                                               // also used as an alternative lnk to get the master detail data joined with child data to be displayed together in the master detail data.
                                             

    const getData = async(page, pageSize, sortField, sortOrder,lnkId, filters={}) => {
        setloading(true);
        //console.log('page = ' + page +' pageSize = ' + pageSize + ' sortField = ' + sortField + '  sortOrder = ' + sortOrder);

        // Build filter query string
        const filterParams = Object.entries(filters)
            .filter(([_, value]) => value && value.length > 0)
            .map(([key, value]) => `${key}=${value.join(",")}`)
            .join("&");

        if(typeof lnkId === "number" && lnkId > 0){
            console.log(lnkId)
            const link = 'http://localhost:9002/hms/'+lnk + 'Get' + '?page=' + page + '&size=' + pageSize+ '&sort=' + sortField+ ',' + sortOrder + '&filterParams=' + filterParams ;	

            axios.post(link,lnkId,{headers: headers}
                ).then(res => {                                
                    setTabData(res.data.content);   //res.data.content is an array of objects
                    setTotalPages(res.data.totalPages);
                    setTotalRecords(res.data.totalElements);

                    })
                .catch((error) => {
                    console.warn("response", error.response?.data);                
                })
                .finally(()=>{
                    setloading(false);
                });
        }else{
            const link = 'http://localhost:9002/hms/' + props.lnk + '?page=' + page + '&size=' + pageSize+ '&sort=' + sortField+ ',' + sortOrder + '&filterParams=' + filterParams ;	 
            axios.get(link,{headers: headers}
                ).then(res => {                                
                    setTabData(res.data.content);   //res.data.content is an array of objects
                    //console.log(res.data)
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
    }

    useEffect(() => {
	    getData(0,10,'','asc',lnkId);
	  }, []);

    // build columns whenever data or sort state changes
    useEffect(() => {
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

                    // 👇 Universal boolean renderer (never mutates record)
                    if (typeof tabData[0][key] === "boolean") {
                        col.render = (_, record) => (record[key] ? "Yes" : "No");
                    }

                    // 👇 Add hyperlink rendering for IDs
                    if (modifyView !== "view" && (key === "id" || key==="code")) {
                        col.render = (text, record) => {
                            let display =
                                text ??    
                                record.id ??
                                record.code ??
                                record.pk?.code ??
                                ""; 
                            //console.log(col)
                            return(
                                <AddButton  class='AddLinkButton' 
                                            page={props.name} 
                                            title= {pageTitle} 
                                            btn_type='link' 
                                            lnk={lnk} 
                                            detailLink={detailLink}
                                            backLink={backLink} 
                                            excludeFields={excludeFields} 
                                            actionLink={modifyLink} 
                                            name={record.id ?? record.code} 
                                            bodyData={tabData}
                                            detailExcludeFields={detailExcludeFields}
                                            masterFields = {masterFields}
                                            masterDefaultValues = {masterDefaultValues}
                                            detail={detail}
                                            disabledFields={disabledFields}
                                            detailChild={detailChild}
                                            entryView={entryView}
                                            updateMaster={updateMaster}
                                            forwardKey={forwardKey}
                                            detailId={record[forwardKey]}
                                            masterId={record.id}
                                            formTabId={record.id}
                                            formTabLink={formTabLink}
                                            formTabEntity={formTabEntity}
                                            rec= {record} 
                                            createdBy={record.createdBy} 
                                            createdOn={record.createdOn} 
                                            comments={record.comments}>
                                    {display}
                                </AddButton>
                            );
                    }
                }
                return col;
            });
            const spacedCols = cols.map(col => ({ ...col, title: toSpacedWords(col.title) }));
            setTabColumns(spacedCols);
        }
    }, [tabData, sortField, sortOrder, tableExcludeFields]);

    useEffect(() => {
	//    console.log('totalPages =' + totalPages);
	  }, [totalPages]);
    useEffect(() => {
	//    console.log('totalRecords =' + totalRecords);
	  }, [totalRecords]);

    useEffect(() => {
        //console.log(tabData)
        if (!Array.isArray(tabData)) return;
        const cleaned = tabData.map(row => {        //Builds a new cleaned array (cleaned) by iterating over the array and then over each object’s keys
            const newRow = {};                      
            Object.entries(row).forEach(([key, value]) => {     //Loops through each field (key → value) in that record.
                if (typeof value === "string" && value.includes(String.fromCharCode(31))) {
                    newRow[key] = value.substring(0, value.indexOf(String.fromCharCode(31)));   //If the value contains ASCII 31, it strips everything after it.
            //    } else if (typeof value === "boolean" ) {
            //        newRow[key] = value ? "Yes" : "No";
                }else{
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
	
    return(
        <div>
            <Space size={15} direction="vertical">
                <Typography.Text className='Title'>
                    {props.name}
                </Typography.Text>
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
               
               {entryView !== "view"?
                    <AddButton  class="AddButton" 
                                name= "Add"  
                                page={props.name} 
                                title= {pageTitle} 
                                lnk={props.lnk}
                                backLink={backLink}
                                actionLink={actionLink} 
                                detail={detail}
                                forwardKey={forwardKey}
                                bodyData={tabData} 
                                excludeFields={excludeFields} 
                                detailExcludeFields={detailExcludeFields}
                                masterFields = {masterFields}
                                masterDefaultValues = {masterDefaultValues}
                                disabledFields={disabledFields}
                                icon={<PlusOutlined/>} 
                                btn_type='primary'>
                    </AddButton>:null}
                
            </Space>
        </div>
    );
}