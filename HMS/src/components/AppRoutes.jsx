import { Routes, Route } from 'react-router'
import './AppPage.css';
import { Dashboard } from '../pages/Dashboard';
import { Register } from '../pages/Register';
import { SubMenu } from '../pages/SubMenu';
import { MenuHeader } from '../pages/MenuHeader';
import { Menu } from '../pages/Menu';
import { AccessUser } from '../pages/AccessUser';
import { AddPage } from './AddPage';
import { ModifyForm } from './ModifyForm';


export function AppRoutes(){
    return(
        <div className="AppRoutes">
            <Routes>
                <Route index element={<Dashboard/>}/> {/* index = path="/"*/}
                <Route path="/accessUser" element={<AccessUser/>}/>
                <Route path="/accessUser/add" element={<AddPage/>}/>
                <Route path="/accessUser/modify" element={<ModifyForm/>}/>
                <Route path="/subMenu" element={<SubMenu/>}/>
                <Route path="/subMenu/add" element={<AddPage/>}/>
                <Route path="/subMenu/modify" element={<ModifyForm/>}/>
                <Route path="/menuHeader" element={<MenuHeader/>}/>
                <Route path="/menuHeader/add" element={<AddPage/>}/>
                <Route path="/menuHeader/modify" element={<ModifyForm/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/menu/add" element={<AddPage/>}/>
                <Route path="/menu/modify" element={<ModifyForm/>}/>
            </Routes>
        </div>
    );
}