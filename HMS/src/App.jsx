import { useState } from 'react';
import { Space } from 'antd';
import { Navigate } from 'react-router';
import './App.css';
import { AppHeader } from './components/AppHeader';
import { SideMenu } from './components/SideMenu';
import { AppFooter } from './components/AppFooter';
import { PageContent } from './components/PageContent';
import { Register } from './pages/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userMenu, setUserMenu] = useState(null);
  const getUserMenuData = (userMenu) =>{  //use back a prop from a called function
    setUserMenu(userMenu);
    console.log('from app ' + userMenu);
  }
  const items=[
                    {
                      label: "Dashbaord",
                      children:[{
                                    label: "Dashbaord1"
                                },
                                {
                                    label: "Dashbaord2",
                                    children:[{
                                                label: "Dashbaord11",
                                                key: '/'
                                              },
                                              {
                                                label: "Register",
                                                key: '/register'
                                              }]

                                }]
                    },
                    {
                        label: "Inventory",
                        key: '/inventory',
                    },
                    {
                        label: "Orders",
                        key: '/orders',
                    },
                    {
                        label: "Customers",
                        key: '/customers',
                    }
                ];

  return (
    <div className="App">
      {isAuthenticated ? (
            <>
              <AppHeader/>
              <Space className="SideMenuPageContent">
                <SideMenu menuItems={userMenu}></SideMenu>
                <PageContent></PageContent>
              </Space>
              <AppFooter/>
            </>
            ) : (
              <Register onLoginSuccess={() => setIsAuthenticated(true)} populateUserMenu={getUserMenuData}/>
            )
          }
      
    </div>
  );
}

export default App
