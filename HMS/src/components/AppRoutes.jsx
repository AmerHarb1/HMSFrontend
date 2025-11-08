import { Routes, Route } from 'react-router'
import './page.css';
import { Dashboard } from '../pages/Dashboard';
import { Inventory } from '../pages/Inventory';
import { Orders } from '../pages/Orders';
import { Customers } from '../pages/Customers';
import { Register } from '../pages/Register';

export function AppRoutes(){
    return(
        <div className="AppRoutes">
            <Routes>
                <Route index element={<Dashboard/>}/> {/* index = path="/"*/}
                <Route path="/inventory" element={<Inventory/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/customers" element={<Customers/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </div>
    );
}