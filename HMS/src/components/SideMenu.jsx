import { Menu } from 'antd';
import { useNavigate } from 'react-router';
import './AppPage.css';

export function SideMenu({menuItems}){
    const navigate = useNavigate();
    return(
        <div className="SideMenu">
            <Menu className="SideMenu"
                mode="inline"
                onClick={(item)=>{
                    navigate(item.key);
                }}
                items={menuItems}>
            </Menu>
        </div>
    );
}