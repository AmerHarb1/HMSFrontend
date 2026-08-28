import  {Search } from '../components/Search';
import { DrugConsumptionFrequency } from './DrugConsumptionFrequency';

export function ProductInventoryComponentSearch() {
  return (
    <div >
        <Search name= "Product Inventory Component Search" 
                lnk="productSearch"              //search link
                searchLink="productInventoryComponent"   //page to go to after selecting a record from search results
                formTabLink="productInventoryComponent"
                detailLink="productInventoryComponent"
                searchFields = {['ProductId','productType', 'productDivision', 'productGroup', 'productCategory', 'itemNumber', 'Description']}
                searchValues = {{ productId: ''
                                , productType: '\x1F'
                                , productDivision: '\x1FproductType'
                                , productGroup: '\x1FproductDivision'
                                , productCategory: '\x1FproductGroup'
                                , itemNumber: '\x1FproductCategory'
                                , description: ''
                                }}
                disabledFields={{ product:''
                                , comments:''
                                , id:''
                              }}
                excludeFields={{  createdBy: ''
                                , createdDate: ''
                              }}
        />
    </div>
  );
}