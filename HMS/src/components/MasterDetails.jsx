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
import {fetchRecordById} from "../functions/fetchRecordById.js";
import { toSpacedWords } from "../functions/toSpacedWords.js";


export function MasterDetails(props) {
    const [loading, setloading ] = useState(true);
    const headers = getHeader();
    const [tabData, setTabData] = useState([]);
    const [serviceFormData, setServiceFormData] = useState(props.serviceFormData);
    const [serviceAddFormData, setServiceAddFormData] = useState(props.serviceAddFormData);
    //const [forwardKey, setForwardKey] = useState(props.forwardKey);
    
    const [tabDataNoChar, setTabDataNoChar] = useState([]);
    const [tabColumns, setTabColumns] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setpPage] = useState(0);
    const [pageSize, setpPageSize] = useState(10);
    const [sortField, setSortField] = useState('');//chaged to comments from id, because all tables have field comments but not id
    const [sortOrder, setSortOrder] = useState('asc');
    const masterDefaultValues = useState(props.masterDefaultValues);
    const excludeFields = props.excludeFields;
    const detailExcludeFields = props.detailExcludeFields;
    const disabledFields = props.disabledFields;
    const entryView = props.entryView;      //usage of this field is dscribed in addTable
    const modifyView = props.modifyView;     //usage of this field is dscribed in addTable
    const detailChild = props.detailChild;  //usage of this field is dscribed in addTable
    const detailLink = props.detailLink;    //usage of this field is dscribed in addTable
    const detailSubmitLink = props.detailSubmitLink;    //used to add a submit button in detail, where it's value used as the link and the master id is the id passed with the link
    const detailSubmitButton = props.detailSubmitButton;
    const masterId = props.masterId; 
    const showInitialData = props.showInitialData   // shows the initial data in AddForm

    const resolveLink = () => {
          if (props.detailChild !== undefined && props.detailChild !== null) {
              return props.detailChild;
          }
          if (props.detailLink !== undefined && props.detailLink !== null) {
              return props.detailLink;
          }
          if (props.lnk !== undefined && props.lnk !== null) {
              return props.lnk;
          }
          return undefined//state?.recId ?? null;
      };
    const lnk = resolveLink();

    const detail = props.detail;
    const title = props.title;
       
    const childActionLink = lnk+'/entry';
    const actionLink = lnk+'/add';
    const modifyLink = detailChild?childActionLink:lnk+'/modify';
    const backLink = props.backLink;
    const masterFields=props.masterFields;
    const masterCode = props.masterCode;
    const masterCodeValue = props.masterCodeValue;
    const forwardKey = props.forwardKey;
    const localLovMapRef = props.masterLocalLovMap;
    const subDetailId = props.subDetailId;
    const autoFill = props.autoFill;
    const autoFillLink = props.autoFillLink;
    const autoFillParent = props.autoFillParent;//used as the parent for auto fill

    const getData = async(page, pageSize, sortField, sortOrder, filters={}) => {
        setloading(true);
        // Build filter query string
        const filterParams = Object.entries(filters)
            .filter(([_, value]) => value && value.length > 0)
            .map(([key, value]) => `${key}=${value.join(",")}`)
            .join("&");
        
        const link = 'http://localhost:9002/hms/'+lnk + 'Get' + '?page=' + page + '&size=' + pageSize+ '&sort=' + sortField+ ',' + sortOrder + '&filterParams=' + filterParams ;	
//console.log(link) 
        axios.post(link,masterId,{headers: headers}
            ).then(res => {      
                console.log(res.data.content)                       
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
        //console.log(tabData)
        if (tabData?.length > 0 && tabData[0] && typeof tabData[0] === "object") {
        //    setTabDataNoChar(tabData);
            const firstRow = tabData[0] ?? {};
            const cols = Object.keys(firstRow)
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
                    if (modifyView !== "view" && (key === "id" || key==="code")) {
                        col.render = (text, record) => {
                            const display =
                                text ??    
                                record.id ??
                                record.code ??
                                record.pk?.code ??
                                record.pk?.itemNumber ??
                                ""; 
                                             
                            return(
                                modifyView !== "view" || detailChild !== 'undefined'?
                                    <AddButton  class='AddLinkButton' 
                                                page={title + ' ' + detail} 
                                                btn_type='link' 
                                                lnk={lnk} 
                                                excludeFields={excludeFields} 
                                                detailExcludeFields={detailExcludeFields}
                                                disabledFields={disabledFields} 
                                                actionLink={modifyLink} 
                                                name={ record.id ?? record.code ?? record.pk?.code ?? record.pk?.itemNumber ?? null } 
                                                bodyData={tabData} 
                                                rec= {record} 
                                                detailLink={detailLink}
                                                backLink={backLink}
                                                backId={record.id}
                                                masterId={subDetailId ? record.id : masterId}
                                                forwardKey={forwardKey}
                                                entryView={entryView}
                                                detail={detail}
                                                title={title+ ' ' + detail}
                                                serviceFormData={props.serviceFormData}
                                                masterFields={masterFields}
                                                masterCode = {masterCode} 
                                                masterCodeValue={masterCodeValue}
                                                masterDefaultValues={null}
                                                masterLocalLovMap={localLovMapRef}
                                                autoFill= {autoFill}
                                                autoFillLink= {autoFillLink}
                                                autoFillParent= {autoFillParent}
                                                showInitialData={showInitialData}
                                                createdBy={record.createdBy} 
                                                createdOn={record.createdOn} 
                                                comments={record.comments}>
                                        {display}
                                    </AddButton>:display
                            );
                    }
                }
                return col;
            });
            const spacedCols = cols.map(col => ({ ...col, title: toSpacedWords(col.title) }));
            setTabColumns(spacedCols);
        }
    }, [tabData, sortField, sortOrder]);

    useEffect(() => {
        if (!Array.isArray(tabData)) return;
        const cleaned = tabData
            .filter(row => row && typeof row === "object")   // 👈 guard each row
            .map(row => {
                const newRow = {};
                Object.entries(row).forEach(([key, value]) =>  {     //Loops through each field (key → value) in that record.
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

    async function sendToMachine () {
        axios.get(`http://localhost:9002/hms/${detailSubmitLink}/${masterId}`)
            .then(() => {
                console.log("Sent to machine successfully");
            })
            .catch(err => {
                console.error(err);
            });
    }

	const cancelClicked = () => {
        history.back(); //history.go(-1)
    };

    return(
        <div>
            <Space size={15} direction="vertical">
                <Table
                    className="Tab"
                    columns={tabColumns}
                    dataSource={tabDataNoChar}
                    rowKey={(record) => record.id}
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
                                name= 'Add' 
                                page={title+ ' ' + detail} 
                                lnk={lnk} 
                                actionLink={actionLink} 
                                bodyData={tabData} 
                                tabData={tabData} 
                                rec={tabData} 
                                backLink={backLink}
                                backId={masterId}
                                masterId={subDetailId ? tabData.id : masterId}
                                forwardKey={forwardKey}
                                detailLink={detailLink}
                                detail={detail}
                                title={title+ ' ' + detail}
                                serviceFormData={props.serviceFormData} 
                                excludeFields={excludeFields} 
                                detailExcludeFields={detailExcludeFields} 
                                disabledFields={disabledFields}
                                masterFields={masterFields}
                                masterCode = {masterCode} 
                                masterCodeValue={masterCodeValue}
                                masterDefaultValues={masterDefaultValues}
                                masterLocalLovMap={localLovMapRef}
                                showInitialData={showInitialData}
                                autoFill= {autoFill}
                                autoFillLink= {autoFillLink}
                                autoFillParent= {autoFillParent}
                                icon={<PlusOutlined/>} 
                                btn_type='primary'>
                    </AddButton>:null}
                {detailSubmitLink !== undefined ?<td><button type="button" className="form-button" onClick={sendToMachine}>{detailSubmitButton}</button></td>:null}
                {backLink === 'back' ?<td><button className="form-button" onClick={cancelClicked}>Back</button></td>:null}
            </Space>
        </div>
    );
}