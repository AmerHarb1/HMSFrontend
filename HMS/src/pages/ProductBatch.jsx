import  {Master } from '../components/Master';

export function ProductBatch() {
  return (
          <div >  	
              <Master title= "Product Batches"  
                      lnk="productBatch" 
                      detail="" 
                      forwardKey="productBatchId" 
                      masterCode="productType-productDivision-productGroup-productCategory-itemNumber" 
                      excludeFields={{id: '', createdBy: '', createdDate: ''}} 
                      detailExcludeFields={{id: '', createdBy: '', createdDate: '', productType: '', productDivision: '', productGroup: '', productCategory: '', itemNumber: ''}} 
                      masterData = {['id','productType', 'productDivision', 'productGroup', 'productCategory', 'itemNumber']} 
                      tabDataValues = {{id: '', productType: '\x1F', productDivision: '\x1FproductType', productGroup: '\x1FproductDivision', productCategory: '\x1FproductGroup', itemNumber: '\x1FproductCategory'}}/>
          </div>
      );
}