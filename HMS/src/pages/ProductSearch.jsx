import  {Search } from '../components/Search';

export function ProductSearch() {
  return (
    <div >  	
        <Search name= "Product Search" 
                lnk="productSearch"
                searchLink="doctorVisit"
                searchFields = {['PatientId','FirstName', 'LastName', 'BithDate']}
                searchValues = {{PatientId: '', FirstName: '', LastName: '', BirthDate: ''}}
        />
    </div>
  );
}