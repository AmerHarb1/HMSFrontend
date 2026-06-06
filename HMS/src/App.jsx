import { useState } from 'react';
import { Space } from 'antd';
import { Navigate } from 'react-router';
import './App.css';
import 'antd/dist/reset.css'; // for AntD v5
import { AppHeader } from './components/AppHeader';
import { SideMenu } from './components/SideMenu';
import { AppFooter } from './components/AppFooter';
import { PageContent } from './components/PageContent';
import { Register } from './pages/Register';
import { Calendar } from './components/Calendar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userMenu, setUserMenu] = useState(null);
  const getUserMenuData = (userMenu) =>{  //use back a prop from a called function
    setUserMenu(userMenu);
    console.log('from app ' + userMenu);
  }

  return (
    <div className="App">
     111
      {/*isAuthenticated ? (
            <>
              <AppHeader/>
              <Space className="SideMenuPageContent">
                <SideMenu menuItems={userMenu}></SideMenu>
                <PageContent></PageContent>
              </Space>

            </>
            ) : (
              <Register onLoginSuccess={() => setIsAuthenticated(true)} populateUserMenu={getUserMenuData}/>
            )
         */}
         <Calendar></Calendar>
      
    </div>
  );
}

export default App
