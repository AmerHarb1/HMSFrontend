import { Table, Card, Space, Statistic, Typography } from "antd";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getHeader } from "../functions/getHeader";
import '../styles/report.css';

export function BalanceSheet() {

    const [loading, setLoading] = useState(true);
    const [assets, setAssets] = useState([]);
    const [liabilities, setLiabilities] = useState([]);
    const [equities, setEquities] = useState([]);
    const headers = getHeader();

    const getData = async () => {
        setLoading(true);

        const link = 'http://localhost:9002/hms/balanceSheet';

        axios.get(link, { headers })
            .then(res => {
                const rows = res.data;
                // Build arrays first
                const a = [];
                const l = [];
                const e = [];

                rows.forEach(row => {
                    const mapped = {
                        account: row.accountName,
                        amount: row.amount
                    };

                    if (row.accountType === 'Assets') a.push(mapped);
                    else if (row.accountType === 'Liability') l.push(mapped);
                    else e.push(mapped);
                });

                // Set state once
                setAssets(a);
                setLiabilities(l);
                setEquities(e);
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
            <Typography.Title className='TitleRep'>Balance Sheet</Typography.Title>

            <Space direction="horizontal" className="BalanceSheet">
                <DashboardCard title="Assets" data={assets} />
            
            <Space direction="vertical" className="BalanceSheet">
                <DashboardCard title="Liabilities" data={liabilities} />
                <DashboardCard title="Equities" data={equities} />
            </Space></Space>
        </div>
    );
}

function DashboardCard({ title, data }) {

    const tabColumns = [        
        { title: 'Account', dataIndex: 'account', key: 'account' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount' }
    ];

    return (
        
            <Space direction="vertical" style={{ width: "100%" }}>              

                <table className="Report">
                    <thead>
                        <tr>
                        <th>Account</th>
                        <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>            	
                        {data.map((row, index) => (
                                <tr key={index}>					  	
                                    <td>{row.account}</td>
                                    <td>{row.amount ?? 0}</td>
                                </tr>) 
                        )}	
                    </tbody>
		        </table>        

                <Statistic title={title + ' Total'} value={data.reduce((sum, r) => sum + r.amount, 0)} className="Total"/>
            </Space>
        
    );
}