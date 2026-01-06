import { DatePicker , message,  Space, Statistic, Typography } from "antd";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getHeader } from "../functions/getHeader";
import '../styles/report.css';

export function IncomeStatement() {

    const [loading, setLoading] = useState(true);
    const [assets, setAssets] = useState([]);
    const [formData, setFormData] = useState({});
    const headers = getHeader();

    const link = 'http://localhost:9002/hms/incomeStatement';

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.post(link, formData, { headers })
            .then(res => {
                const rows = res.data;
                // Build arrays first
                const a = [];                

                rows.forEach(row => {
                    let mapped = {
                            account: row.accountName,
                            debit: row.debit,
                            credit: row.credit
                        };  
                        a.push(mapped);                                      
                });
                setAssets(a);
            })
            .catch(error => {
                console.warn("response", error.response?.data);
            })
            .finally(() => {
                setLoading(false);
            })
        .catch((error) => {
            alert(error.response?.data)
            if (Array.isArray(error.response?.data)) {
                message.error(error.response.data.join(", "));
            } else if (error.response?.data?.message) {
                message.error(error.response.data.message);
            } else {
                message.error("An error occurred");
            }
        });
    };

    return (
        <div >
            <Typography.Title className='TitleRep'>Income tatement</Typography.Title>
            <form onSubmit={handleSubmit}>
                <table className='entry-Tab'>
                    <tbody>
                        <tr>					  	
                            <td><label htmlFor="name">Start Date:</label></td>
                            <td><DatePicker id={'startDate'} 
                                            name={'startDate'}
                                            format="MM/DD/YYYY" 
                                            placeholder="Select date"
                                            onChange={(date) => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    startDate: date ? date.format("YYYY-MM-DD") : null
                                                }));
                                            }}
                                            className='dateField'
                            /></td>
                        </tr>
                        <tr>					  	
                            <td><label htmlFor="name">End Date:</label></td>
                            <td><DatePicker id={'endDate'} 
                                            name={'endtDate'}
                                            format="MM/DD/YYYY" 
                                            placeholder="Select date"
                                            onChange={(date) => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    endDate: date ? date.format("YYYY-MM-DD") : null
                                                }));
                                            }}
                                            className='dateField'
                            /></td>
                        </tr>
                        <tr>
                            <td><button className="form-button" type="submit">Submit</button></td>
                        </tr>
                    </tbody>
		        </table>
                {/* ✅ Render the Income Statement table */}
                {assets.length > 0 && (
                    <DashboardCard title="Income Statement" data={assets} />
                )}
            </form>           	
        </div>
    );
}

function DashboardCard({ title, data }) {

    return (
        
            <Space direction="vertical" style={{ width: "100%" }}>              

                <table className="Report">
                    <thead>
                        <tr>
                        <th>Account</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        </tr>
                    </thead>
                    <tbody>            	
                        {data.map((row, index) => (
                                <tr key={index}>					  	
                                    <td>{row.account}</td>
                                    <td>{row.debit ?? 0}</td>
                                    <td>{row.credit ?? 0}</td>
                                </tr>) 
                        )}	
                    </tbody>
		        </table>        

                <Statistic title={title + ' Total'} value={data.reduce((sum, r) => sum + ((r.debit || 0) - (r.credit || 0)), 0)} className="Total"/>
            </Space>
        
    );
}