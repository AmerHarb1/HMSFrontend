import  {Master } from '../components/Master';

import '../styles/report.css';

export function ServiceProduct() {

    return (
        <div >  	
            <Master title= "Service Product" 
                    lnk="serviceProduct" 
                    detail="Detail"
                    forwardKey="serviceProductId"
                    excludeFields={{id: '', createdBy: '', createdDate: ''}}
                    detailExcludeFields={{id: '', createdBy: '', createdDate: ''}}
                    masterFields = {['id','productType', 'productDivision', 'productGroup', 'productCategory', 'itemNumber']}
                    masterDefaultValues = {{id: '', productType: '\x1F', productDivision: '\x1FproductType', productGroup: '\x1FproductDivision', productCategory: '\x1FproductGroup', itemNumber: '\x1FproductCategory'}}/>
        </div>
    );
}