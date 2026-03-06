import { Menu } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './AppPage.css';

export function SideMenu({menuItems}){
    const navigate = useNavigate();
    const [openKeys, setOpenKeys] = useState([]); 

    const onOpenChange = (keys) => { // Only keep the last opened root submenu 
       // const latestKey = keys.find(key => !openKeys.includes(key)); 
       // setOpenKeys(latestKey ? [latestKey] : []); 
       setOpenKeys(keys);
    };
    return(
        <div className="SideMenu">
            <Menu className="SideMenu"
                mode="inline"
                items={menuItems}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={(item)=>{
                    navigate(item.key);
                    
                }}>
            </Menu>
        </div>
    );
}