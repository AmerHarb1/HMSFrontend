import { Card, Space, Statistic, Typography } from "antd";
import { DollarCircleOutlined, ShoppingCartOutlined,  UserOutlined } from '@ant-design/icons';

export function Dashboard(){
    return(
        <div className="Dashboard">
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space direction="horizontal">
                <DashboardCard icon={<ShoppingCartOutlined 
                    style={{color: 'green',
                            backgroundColor: 'rgba(0,255,0,0.15)',
                            borderRadius: 24,
                            fontSize: 24,
                            padding: 8
                    }}/>} 
                    title={"Orders"} value={12345}/>
                <DashboardCard icon={<DollarCircleOutlined
                    style={{color: 'red',
                            backgroundColor: 'rgba(255,0,0,0.15)',
                            borderRadius: 24,
                            fontSize: 24,
                            padding: 8
                    }}/>}
                    title={"Inventory"} value={9874}/>
                <DashboardCard icon={<UserOutlined
                    style={{color: 'blue',
                            backgroundColor: 'rgba(0,0,255,0.15)',
                            borderRadius: 24,
                            fontSize: 24,
                            padding: 8
                    }}/>} 
                    title={"Customers"} value={56458}/>
            </Space>   
        </div>
    );
}

function DashboardCard({icon, title, value}){
    return(
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value}/>
            </Space>
        </Card>
    );
}