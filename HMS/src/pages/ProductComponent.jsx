import  {Master } from '../components/Master';

import '../styles/report.css';

export function ProductComponent() {

    return (
        <div >  	
            <Master title= "Product Component" 
                    lnk="productComponent" 
                    detail="Detail"
                    forwardKey="productComponentId"
                    excludeFields={{id: '', createdBy: '', createdDate: ''}}
                    detailExcludeFields={{id: '', createdBy: '', createdDate: ''}}
                    masterFields = {['id','productType', 'productDivision', 'productGroup', 'productCategory', 'itemNumber']}
                    masterDefaultValues = {{id: '', productType: '\x1F', productDivision: '\x1FproductType', productGroup: '\x1FproductDivision', productCategory: '\x1FproductGroup', itemNumber: '\x1FproductCategory'}}/>
        </div>
    );
}