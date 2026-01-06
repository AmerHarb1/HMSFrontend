import { Table, Card, Space, Statistic, Typography } from "antd";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getHeader } from "../functions/getHeader";
import '../styles/report.css';

export function TrialBalance() {

    const [loading, setLoading] = useState(true);
    const [assets, setAssets] = useState([]);
    const headers = getHeader();

    const getData = async () => {
        setLoading(true);

        const link = 'http://localhost:9002/hms/trialBalance';

        axios.get(link, { headers })
            .then(res => {
                const rows = res.data;
                // Build arrays first
                const a = [];
                

                rows.forEach(row => {
                    let mapped
                    if(row.accountType === 'Assets' || row.accountType === 'Expenses' || row.accountType === 'Dividants'){
                        mapped = {
                            account: row.accountName,
                            debit: row.amount,
                            credit: null,
                        };
                    }else{
                        mapped = {
                            account: row.accountName,
                            debit: null,
                            credit: row.amount
                        };
                    }

                     a.push(mapped);
                });

                // Set state once
                setAssets(a);
            })
            .catch(error => {
                console.warn("response", error.response?.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div >
            <Typography.Title className='TitleRep'>Trial Balance</Typography.Title>

            <Space direction="horizontal" className="BalanceSheet">
                <DashboardCard title="Assets" data={assets} /></Space>
        </div>
    );
}

function DashboardCard({ title, data }) {

    const tabColumns = [        
        { title: 'Account', dataIndex: 'account', key: 'account' },
        { title: 'Debit'  , dataIndex: 'debit', key: 'debit' },
        { title: 'Credit' , dataIndex: 'credit', key: 'credit' }
    ];

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

                <Statistic title={title + ' Total'} value={data.reduce((sum, r) => sum + r.debit - r.credit, 0)} className="Total"/>
            </Space>
        
    );
}