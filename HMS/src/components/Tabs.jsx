import React, { useState } from 'react';
import './TabCss.css';

export function Tabs(props){
    const [activeIndex, setActiveIndex] = useState(0);
    const tabs = props.tabs;

    if (!tabs || tabs.length === 0) {
        return <div>No tabs available</div>;
    }

    return (
        <div className="tabContainer">
            <div className="tabHeader">
                {
                    tabs.map((tab, index) =>{
                        return <button 
                                className={`tabButton ${index === activeIndex ? "activeTab" : null}`}
                                onClick={()=> setActiveIndex(index)}
                                key={tab.label}>
                                    {tab.label}
                                </button>
                    })
                }
            </div>
            <div className="tabContent">
                {tabs[activeIndex].content}
            </div>
        </div>
    );
}