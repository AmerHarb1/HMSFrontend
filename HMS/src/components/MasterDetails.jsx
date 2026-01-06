import { Table, Space} from 'antd';
import axios from 'axios';
import React,{ useState, useEffect} from 'react';
import { AddButton } from '../components/AddButton';
import '../styles/page.css';
import 'antd/dist/reset.css'; // for AntD v5
//import {isDate} from '../functions/isDate.js';
import {formatDate} from '../functions/formatDateVal.js';
import { getValueType } from '../functions/getValueType.js';
import { getHeader } from "../functions/getHeader";
import { PlusOutlined } from '@ant-design/icons';
import {removeChr31} from "../functions/removeChr31.js";

export function MasterDetails(props) {
    const [loading, setloading ] = useState(true);
    const headers = getHeader();
    const [tabData, setTabData] = useState([]);
    const [serviceFormData, setServiceFormData] = useState(props.serviceFormData);
    const [serviceAddFormData, setServiceAddFormData] = useState(props.serviceAddFormData);
    const [forwardKey, setForwardKey] = useState(props.forwardKey);
    const [backLink, setBackLink] = useState(props.backLink);
    const [tabDataNoChar, setTabDataNoChar] = useState([]);
    const [tabColumns, setTabColumns] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setpPage] = useState(0);
    const [pageSize, setpPageSize] = useState(10);
    const [sortField, setSortField] = useState('');//chaged to comments from id, because all tables have field comments but not id
    const [sortOrder, setSortOrder] = useState('asc');
    const excludeFields = props.excludeFields;
    const lnk = props.lnk;
    //setServiceFormData(props.serviceFormData);
    const actionLink = lnk+'/add';
    const modifyLink = lnk+'/modify';
    const masterData=props.masterData;
    console.log(forwardKey)
    const getData = async(page, pageSize, sortField, sortOrder, filters={}) => {
        setloading(true);
        let reducedForm = "";
        // Build filter query string
        const filterParams = Object.entries(filters)
            .filter(([_, value]) => value && value.length > 0)
            .map(([key, value]) => `${key}=${value.join(",")}`)
            .join("&");

        if(!serviceAddFormData ||Object.keys(serviceAddFormData).length === 0){
            const cleanedFormData = removeChr31(serviceFormData);
            setServiceFormData(cleanedFormData);
            reducedForm = masterData.reduce((o, key) => ({ ...o, [key]: cleanedFormData[key] }), {});
        }else{
            reducedForm = masterData.reduce((o, key) => ({ ...o, [key]: serviceAddFormData[key] }), {});
        }
        
        const link = 'http://localhost:9002/hms/'+props.lnk + 'Get' + '?page=' + page + '&size=' + pageSize+ '&sort=' + sortField+ ',' + sortOrder + '&filterParams=' + filterParams ;	

        axios.post(link,reducedForm,{headers: headers}
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
    }

    useEffect(() => {
	    getData(0,10,'','asc');
	  }, []);
    
    // build columns whenever data or sort state changes
    useEffect(() => {
        if (tabData.length > 0) {
        //    setTabDataNoChar(tabData);
            const cols = Object.keys(tabData[0])
                .filter((key) => {
                    const type = getValueType(tabData[0][key]);
                    return type !== "other";   // 👈 exclude non simple types 
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

                    // 👇 Add hyperlink rendering for IDs
                    if (key === "id" || key==="code") {
                        col.render = (text, record) => {
                            const display =
                                text ??    
                                record.id ??
                                record.code ??
                                record.pk?.code ??
                                "";                   
                            return(
                                <AddButton class='AddLinkButton' page={'Service Product Details'} btn_type='link' lnk={lnk} excludeFields={excludeFields} actionLink={modifyLink} name={record.id?record.id:record.code} bodyData={tabData} rec= {record} createdBy={record.createdBy} createdOn={record.createdOn} comments={record.comments}>
                                    {display}
                                </AddButton>
                            );
                    }
                }
                return col;
            });
            setTabColumns(cols);
        }
    }, [tabData, sortField, sortOrder]);

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
	
    return(
        <div>
            <Space size={15} direction="vertical">
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
                <AddButton  class="AddButton" 
                            name= 'Add' 
                            page={'Service Product Details'} 
                            lnk={lnk} 
                            actionLink={actionLink} 
                            bodyData={tabData} 
                            backLink={backLink}
                            backId={forwardKey}
                            serviceFormData={props.serviceFormData} 
                            excludeFields={excludeFields} 
                            masterData={masterData}
                            icon={<PlusOutlined/>} 
                            btn_type='primary'>
                </AddButton>
            </Space>
        </div>
    );
}