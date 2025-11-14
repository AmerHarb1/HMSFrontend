import { Table, Typography, Space, Modal, Form, Button, Input} from 'antd';
import axios from 'axios';
import React,{ useState, useEffect} from 'react';
import '../styles/page.css';

export function AddTable(props){
    console.log('in Add table' +props.name);
    console.log(props.lnk);
    const [loading, setloading ] = useState(true);
    let accessToken = useState(JSON.parse(localStorage.getItem('accessKey')));
    let amer = accessToken.indexOf(",function ()")
    accessToken = accessToken.slice(0,amer);
    console.log('Token = ' + accessToken);
	//const axiosInstance = axios.create({baseURL: 'http://localhost:9002/hms'});
    const [tabData, setTabData] = useState([]);
    const [tabColumns, setTabColumns] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setpPage] = useState(0);
    const [pageSize, setpPageSize] = useState(10);
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    
    const headers = {'Content-Type': 'application/json', 'Authorization':'Bearer ' + accessToken,'Access-Control-Allow-Origin': 'http://localhost:5173',withCredentials: true}

    const getData = async(page, pageSize, sortField, sortOrder, filters={}) => {
        setloading(true);
        console.log('sortField = ' + sortField + '  sortOrder = ' + sortOrder);

        // Build filter query string
        const filterParams = Object.entries(filters)
            .filter(([_, value]) => value && value.length > 0)
            .map(([key, value]) => `${key}=${value.join(",")}`)
            .join("&");

        const link = 'http://localhost:9002/hms/' + props.lnk + '?page=' + page + '&pageSize=' + pageSize+ '&sort=' + sortField+ ',' + sortOrder + '&filterParams=' + filterParams ;	 
        axios.get(link,{headers: headers}
  			).then(res => {                 
                setTabData(res.data.content);
                setTotalPages(res.data.totalPages);
                setTotalRecords(res.data.totalElements);               
                })
			  .catch((error) => {console.warn("response", error.response?.data)})
              .finally(()=>{
                 setloading(false);
              });	
    }

    useEffect(() => {
	    getData(0,10,'id','asc');
         console.log('tabData =' + tabData);
	  }, []);

    // build columns whenever data or sort state changes
    useEffect(() => {
        if (tabData.length > 0) {
                const cols = Object.keys(tabData[0]).map((key) => {
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

                    // 👇 Add hyperlink rendering for IDs
                    if (key === "id") {
                        col.render = (text, record) => (
                        <a
                            href={`/details/${record.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {text}
                        </a>
                        );
                    }

                });
            setTabColumns(cols);
        }
    }, [tabData, sortField, sortOrder]);

    useEffect(() => {
	    console.log('totalPages =' + totalPages);
	  }, [totalPages]);
    useEffect(() => {
	    console.log('totalRecords =' + totalRecords);
	  }, [totalRecords]);

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
                    dataSource={tabData}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: pageSize,
                        current: page + 1,          // AntD is 1-based, backend is 0-based
                        total: totalRecords,        // use total number of records, not totalPages
                        onChange:(page, pageSize)=>{
                            getData(page -1, pageSize, sortField, sortOrder);    // convert back to 0-based
                            setpPageSize(pageSize);
                            setpPage(page - 1);
                        }
                    }}
                    onChange={(pagination, filters, sorter) => {
                        const field = sorter.field;
                        const order = sorter.order === "ascend" ? "asc" : "desc";

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
                
            </Space>
        </div>
    );
}