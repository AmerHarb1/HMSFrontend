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

    function findMenuByKey(items, key) {
        for (const item of items) {
            if (item.key === key) {
                return item;
            }
            if (item.children && item.children.length > 0) {
                const found = findMenuByKey(item.children, key);
            if (found) 
                return found;
            }
        }
        return null;
    }

    return(
        <div className="SideMenu">
            <Menu className="SideMenu"
                mode="inline"
                items={menuItems}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={(item)=>{
                    const menu = findMenuByKey(menuItems, item.key);
                    navigate(menu.link);
                    
                }}>
            </Menu>
        </div>
    );
}