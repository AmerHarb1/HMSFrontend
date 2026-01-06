import  {Master } from '../components/Master';

import '../styles/report.css';

export function ServiceProduct() {

    return (
        <div >  	
            <Master name= "ServiceProduct" 
                    lnk="serviceProduct" 
                    forwardKey="serviceProductId"
                    excludeFields={{id: '', createdBy: '', createdDate: ''}}
                    masterData = {['id','productType', 'productDivision', 'productGroup', 'productCategory', 'itemNumber']}
                    tabDataValues = {{id: '', productType: '\x1F', productDivision: '\x1FproductType', productGroup: '\x1FproductDivision', productCategory: '\x1FproductGroup', itemNumber: '\x1FproductCategory'}}/>
        </div>
    );
}