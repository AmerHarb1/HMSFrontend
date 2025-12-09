import { Table, Typography, Space, message} from 'antd';
import axios from 'axios';
import React,{ useState, useEffect} from 'react';
import { AddButton } from './AddButton';
import '../styles/page.css';
import 'antd/dist/reset.css'; // for AntD v5
//import {isDate} from '../functions/isDate.js';
import {formatDate} from '../functions/formatDateVal.js';
import { getValueType } from '../functions/getValueType.js';
import { PlusOutlined } from '@ant-design/icons';

export function AddTable(props){
//    console.log('in Add table' +props.name);
//    console.log(props.lnk);
    const [loading, setloading ] = useState(true);
    let accessToken = useState(JSON.parse(localStorage.getItem('accessKey')));
    let amer = accessToken.indexOf(",function ()")
    accessToken = accessToken.slice(0,amer);
//    console.log('Token = ' + accessToken);
	//const axiosInstance = axios.create({baseURL: 'http://localhost:9002/hms'});
    const [tabData, setTabData] = useState([]);
    const [tabDataNoChar, setTabDataNoChar] = useState([]);
    const [tabColumns, setTabColumns] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setpPage] = useState(0);
    const [pageSize, setpPageSize] = useState(10);
    const [sortField, setSortField] = useState('');//chaged to comments from id, because all tables have field comments but not id
    const [sortOrder, setSortOrder] = useState('asc');
    
  	const actionLink = props.lnk+'/add';
    const modifyLink = props.lnk+'/modify';
    
    const headers = {'Content-Type': 'application/json', 'Authorization':'Bearer ' + accessToken,'Access-Control-Allow-Origin': 'http://localhost:5173',withCredentials: true}

    const getData = async(page, pageSize, sortField, sortOrder, filters={}) => {
        setloading(true);
        //console.log('page = ' + page +' pageSize = ' + pageSize + ' sortField = ' + sortField + '  sortOrder = ' + sortOrder);

        // Build filter query string
        const filterParams = Object.entries(filters)
            .filter(([_, value]) => value && value.length > 0)
            .map(([key, value]) => `${key}=${value.join(",")}`)
            .join("&");

        const link = 'http://localhost:9002/hms/' + props.lnk + '?page=' + page + '&size=' + pageSize+ '&sort=' + sortField+ ',' + sortOrder + '&filterParams=' + filterParams ;	 
        axios.get(link,{headers: headers}
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
            setTabDataNoChar(tabData);
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
                        col.render = (text, record) => (
                            <AddButton class='AddLinkButton' page={props.name} btn_type='link' lnk={props.lnk}  actionLink={modifyLink} name={record.id?record.id:record.code} bodyData={tabData} rec= {record} createdBy={record.createdBy} createdOn={record.createdOn} comments={record.comments}>
                               {record.id?record.id:record.code}
                            </AddButton>
                        );
                    }
                return col;
            });
            setTabColumns(cols);
        }
    }, [tabData, sortField, sortOrder]);

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
                <AddButton class="AddButton" name= 'Add' page={props.name} lnk={props.lnk} actionLink={actionLink} bodyData={tabData} icon={<PlusOutlined/>} btn_type='primary'></AddButton>
            </Space>
        </div>
    );
}