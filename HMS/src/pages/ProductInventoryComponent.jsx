import  {Master } from '../components/Master';
import React, { useState, useEffect } from 'react';
import {  useLocation} from 'react-router';
import '../styles/report.css';

export function ProductInventoryComponent(props) {
    const location = useLocation();
    const state = props.state || location.state || {};
    const resolveMasterId = () => {
            if (props.masterId !== undefined && props.masterId !== null) {
                return props.masterId;
            }
            if (state?.masterId !== undefined) {
                return state.masterId;
            }
            return undefined//state?.recId ?? null;
        };
    
    const [masterId, setMasterId] = useState(resolveMasterId());
     useEffect(() => {
            
            if (props.masterId !== undefined && props.masterId !== null) {
                setMasterId(props.masterId);
            }
        }, [props.masterId]);
    console.log(masterId)
    return (
        <div >  	
            <Master title= "Product Inventory Component" 
                    lnk="productInventoryComponent" 
                    detailLink="productInventoryComponentDetail"
                    backLink="productInventoryComponent"
                    forwardKey="productInventoryComponentId"
                    masterId={masterId}
                    showInitialData={true}
                    autoFill = "productInventory" 
                    autoFillLink = "productAutoFill"
                    excludeFields={{id: '', createdBy: '', createdDate: ''}}
                    detailExcludeFields={{id: '', createdBy: '', createdDate: ''}}
                    masterFields = {['id','productType', 'productDivision', 'productGroup', 'productCategory', 'itemNumber']}
                    masterDefaultValues = {{  id: ''
                                            , productType: '\x1F'
                                            , productDivision: '\x1F'
                                            , productGroup: '\x1F'
                                            , productCategory: '\x1F'
                                            , itemNumber: '\x1F'}}                                            
                    disabledFields = {{   id: ''
                                        , productType: ''
                                        , productDivision: ''
                                        , productGroup: ''
                                        , productCategory: ''
                                        , itemNumber: ''}}
            />
        </div>
    );
}