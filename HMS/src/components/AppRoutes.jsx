import { Routes, Route } from 'react-router'
import './AppPage.css';
import { Dashboard } from '../pages/Dashboard';
import { Register } from '../pages/Register';
import { SubMenu } from '../pages/SubMenu';
import { MenuHeader } from '../pages/MenuHeader';
import { Menu } from '../pages/Menu';
import { AccessUser } from '../pages/AccessUser';
import { Account } from '../pages/Account';
import { AccountType } from '../pages/AccountType';
import { AccountSubType } from '../pages/AccountSubType';
import { AccountStatus } from '../pages/AccountStatus';
import { AddPage } from './AddPage';
import { ModifyForm } from './ModifyForm';
import { ModifyPage } from './ModifyPage';
import { GlobalRegion } from '../pages/GlobalRegion';
import { Phone } from '../pages/Phone';
import { PhoneType } from '../pages/PhoneType';
import { Country } from '../pages/Country';
import { County } from '../pages/County';
import { State } from '../pages/State';
import { Street } from '../pages/Street';
import { City } from '../pages/City';
import { StreetType } from '../pages/StreetType';
import { StreetDirection } from '../pages/StreetDirection';
import { UnitType } from '../pages/UnitType';
import { Zip } from '../pages/Zip';
import { Address } from '../pages/Address';
import { AddressType } from '../pages/AddressType';
import { CountryRegion } from '../pages/CountryRegion';
import { OrgExternalAccounts } from '../pages/OrgExternalAccounts';
import { Org } from '../pages/Org';
import { BranchPhone } from '../pages/BranchPhone';
import { BranchAddress } from '../pages/BranchAddress';
import { Branch } from '../pages/Branch';
import { CostCenter } from '../pages/CostCenter';
import { SubCostCenter } from '../pages/SubCostCenter';
import { CostCenterType } from '../pages/CostCenterType';
import { Department } from '../pages/Department';
import { LedgerPeriod } from '../pages/LedgerPeriod';
import { JournalHeader } from '../pages/JournalHeader';
import { GeneralLedger } from '../pages/GeneralLedger';
import { JournalEntry } from '../pages/JournalEntry';
import { LedgerAmountSource } from '../pages/LedgerAmountSource';
import { LedgerAmountSourceType } from '../pages/LedgerAmountSourceType';
import { LedgerPeriodStatus } from '../pages/LedgerPeriodStatus';
import { BalanceSheet } from '../pages/BalanceSheet';
import { TrialBalance } from '../pages/TrialBalance';
import { IncomeStatement } from '../pages/IncomeStatement';
import { Item } from '../pages/Item';
import { ProductType } from '../pages/ProductType';
import { ProductDivision } from '../pages/ProductDivision';
import { ProductGroup } from '../pages/ProductGroup';                
import { ProductCategory } from '../pages/ProductCategory';
import { UnitOfMeasure } from '../pages/UnitOfMeasure';
import { AbcCategory } from '../pages/AbcCategory';
import { LifeTime } from '../pages/LifeTime';
import { StockingCondition } from '../pages/StockingCondition';
import { XyzCategory } from '../pages/XyzCategory';
import { ServiceProduct } from '../pages/ServiceProduct';
import { ServiceProductDetail } from '../pages/ServiceProductDetail';
import { Service } from '../pages/Service';
import { ItemApprovalType } from '../pages/ItemApprovalType';
import { ItemDespenseType } from '../pages/ItemDespenseType';
import { MaterialRequest } from '../pages/MaterialRequest';
import { MaterialRequestDetail } from '../pages/MaterialRequestDetail';                
import { MaterialRequestStatus } from '../pages/MaterialRequestStatus';
import { ProductBatch } from '../pages/ProductBatch';
import { ProductIssuance } from '../pages/ProductIssuance';
import { ProductIssueStatus } from '../pages/ProductIssueStatus';
import { Storage } from '../pages/Storage';
import { StorageType } from '../pages/StorageType';
import { Employee } from '../pages/Employee';
import { EmployeeStatus } from '../pages/EmployeeStatus';


export function AppRoutes(){
    return(
        <div className="AppRoutes">
            <Routes>
                <Route index element={<Dashboard/>}/> {/* index = path="/"*/}
                <Route path="/accessUser" element={<AccessUser/>}/>
                <Route path="/accessUser/add" element={<AddPage/>}/>
                <Route path="/accessUser/modify" element={<ModifyForm/>}/>
                <Route path="/subMenu" element={<SubMenu/>}/>
                <Route path="/subMenu/add" element={<AddPage/>}/>
                <Route path="/subMenu/modify" element={<ModifyPage/>}/>
                <Route path="/menuHeader" element={<MenuHeader/>}/>
                <Route path="/menuHeader/add" element={<AddPage/>}/>
                <Route path="/menuHeader/modify" element={<ModifyForm/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/menu/add" element={<AddPage/>}/>
                <Route path="/menu/modify" element={<ModifyForm/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/account/add" element={<AddPage/>}/>
                <Route path="/account/modify" element={<ModifyForm/>}/>
                <Route path="/accountType" element={<AccountType/>}/>
                <Route path="/accountType/add" element={<AddPage/>}/>
                <Route path="/accountType/modify" element={<ModifyForm/>}/>
                <Route path="/accountSubType" element={<AccountSubType/>}/>
                <Route path="/accountSubType/add" element={<AddPage/>}/>
                <Route path="/accountSubType/modify" element={<ModifyForm/>}/>
                <Route path="/accountStatus" element={<AccountStatus/>}/>
                <Route path="/accountStatus/add" element={<AddPage/>}/>
                <Route path="/accountStatus/modify" element={<ModifyForm/>}/>
                <Route path="/country" element={<Country/>}/>
                <Route path="/country/add" element={<AddPage/>}/>
                <Route path="/country/modify" element={<ModifyForm/>}/>
                <Route path="/globalRegion" element={<GlobalRegion/>}/>
                <Route path="/globalRegion/add" element={<AddPage/>}/>
                <Route path="/globalRegion/modify" element={<ModifyForm/>}/>
                <Route path="/county" element={<County/>}/>
                <Route path="/county/add" element={<AddPage/>}/>
                <Route path="/county/modify" element={<ModifyForm/>}/>
                <Route path="/state" element={<State/>}/>
                <Route path="/state/add" element={<AddPage/>}/>
                <Route path="/state/modify" element={<ModifyForm/>}/>
                <Route path="/city" element={<City/>}/>
                <Route path="/city/add" element={<AddPage/>}/>
                <Route path="/city/modify" element={<ModifyForm/>}/>
                <Route path="/street" element={<Street/>}/>
                <Route path="/street/add" element={<AddPage/>}/>
                <Route path="/street/modify" element={<ModifyForm/>}/>
                <Route path="/streetType" element={<StreetType/>}/>
                <Route path="/streetType/add" element={<AddPage/>}/>
                <Route path="/streetType/modify" element={<ModifyForm/>}/>
                <Route path="/streetDirection" element={<StreetDirection/>}/>
                <Route path="/streetDirection/add" element={<AddPage/>}/>
                <Route path="/streetDirection/modify" element={<ModifyForm/>}/>
                <Route path="/unitType" element={<UnitType/>}/>
                <Route path="/unitType/add" element={<AddPage/>}/>
                <Route path="/unitType/modify" element={<ModifyForm/>}/>
                <Route path="/zip" element={<Zip/>}/>
                <Route path="/zip/add" element={<AddPage/>}/>
                <Route path="/zip/modify" element={<ModifyForm/>}/>
                <Route path="/address" element={<Address/>}/>
                <Route path="/address/add" element={<AddPage/>}/>
                <Route path="/address/modify" element={<ModifyForm/>}/>
                <Route path="/addressType" element={<AddressType/>}/>
                <Route path="/addressType/add" element={<AddPage/>}/>
                <Route path="/addressType/modify" element={<ModifyForm/>}/>
                <Route path="/phone" element={<Phone/>}/>
                <Route path="/phone/add" element={<AddPage/>}/>
                <Route path="/phone/modify" element={<ModifyForm/>}/>
                <Route path="/phoneType" element={<PhoneType/>}/>
                <Route path="/phoneType/add" element={<AddPage/>}/>
                <Route path="/phoneType/modify" element={<ModifyForm/>}/>
                <Route path="/countryRegion" element={<CountryRegion/>}/>
                <Route path="/countryRegion/add" element={<AddPage/>}/>
                <Route path="/countryRegion/modify" element={<ModifyForm/>}/>
                <Route path="/orgExternalAccounts" element={<OrgExternalAccounts/>}/>
                <Route path="/orgExternalAccounts/add" element={<AddPage/>}/>
                <Route path="/orgExternalAccounts/modify" element={<ModifyForm/>}/>
                <Route path="/org" element={<Org/>}/>
                <Route path="/org/add" element={<AddPage/>}/>
                <Route path="/org/modify" element={<ModifyForm/>}/>
                <Route path="/branchPhone" element={<BranchPhone/>}/>
                <Route path="/branchPhone/add" element={<AddPage/>}/>
                <Route path="/branchPhone/modify" element={<ModifyForm/>}/>
                <Route path="/branchAddress" element={<BranchAddress/>}/>
                <Route path="/branchAddress/add" element={<AddPage/>}/>
                <Route path="/branchAddress/modify" element={<ModifyForm/>}/>
                <Route path="/branch" element={<Branch/>}/>
                <Route path="/branch/add" element={<AddPage/>}/>
                <Route path="/branch/modify" element={<ModifyForm/>}/>
                <Route path="/costCenter" element={<CostCenter/>}/>
                <Route path="/costCenter/add" element={<AddPage/>}/>
                <Route path="/costCenter/modify" element={<ModifyForm/>}/>
                <Route path="/subCostCenter" element={<SubCostCenter/>}/>
                <Route path="/subCostCenter/add" element={<AddPage/>}/>
                <Route path="/subCostCenter/modify" element={<ModifyForm/>}/>
                <Route path="/costCenterType" element={<CostCenterType/>}/>
                <Route path="/costCenterType/add" element={<AddPage/>}/>
                <Route path="/costCenterType/modify" element={<ModifyForm/>}/>
                <Route path="/department" element={<Department/>}/>
                <Route path="/department/add" element={<AddPage/>}/>
                <Route path="/department/modify" element={<ModifyForm/>}/>
                <Route path="/ledgerPeriod" element={<LedgerPeriod/>}/>
                <Route path="/ledgerPeriod/add" element={<AddPage/>}/>
                <Route path="/ledgerPeriod/modify" element={<ModifyForm/>}/>
                <Route path="/journalHeader" element={<JournalHeader/>}/>
                <Route path="/journalHeader/add" element={<AddPage/>}/>
                <Route path="/journalHeader/modify" element={<ModifyForm/>}/>
                <Route path="/generalLedger" element={<GeneralLedger/>}/>
                <Route path="/generalLedger/add" element={<AddPage/>}/>
                <Route path="/generalLedger/modify" element={<ModifyForm/>}/>
                <Route path="/journalEntry" element={<JournalEntry/>}/>
                <Route path="/journalEntry/add" element={<AddPage/>}/>
                <Route path="/journalEntry/modify" element={<ModifyForm/>}/>
                <Route path="/ledgerAmountSource" element={<LedgerAmountSource/>}/>
                <Route path="/ledgerAmountSource/add" element={<AddPage/>}/>
                <Route path="/ledgerAmountSource/modify" element={<ModifyForm/>}/>
                <Route path="/ledgerAmountSourceType" element={<LedgerAmountSourceType/>}/>
                <Route path="/ledgerAmountSourceType/add" element={<AddPage/>}/>
                <Route path="/ledgerAmountSourceType/modify" element={<ModifyForm/>}/>
                <Route path="/ledgerPeriodStatus" element={<LedgerPeriodStatus/>}/>
                <Route path="/ledgerPeriodStatus/add" element={<AddPage/>}/>
                <Route path="/ledgerPeriodStatus/modify" element={<ModifyForm/>}/>
                <Route path="/balanceSheet" element={<BalanceSheet/>}/>
                <Route path="/trialBalance" element={<TrialBalance/>}/>
                <Route path="/incomeStatement" element={<IncomeStatement/>}/>
                <Route path="/productType" element={<ProductType/>}/>
                <Route path="/productDivision" element={<ProductDivision/>}/>
                <Route path="/productGroup" element={<ProductGroup/>}/>
                <Route path="/productCategory" element={<ProductCategory/>}/>
                <Route path="/serviceProduct" element={<ServiceProduct/>}/>
                <Route path="/serviceProductDetail" element={<ServiceProductDetail/>}/>
                <Route path="/unitOfMeasure" element={<UnitOfMeasure/>}/>                
                <Route path="/stockingCondition" element={<StockingCondition/>}/>
                <Route path="/abcCategory" element={<AbcCategory/>}/>
                <Route path="/xyzCategory" element={<XyzCategory/>}/>
                <Route path="/lifeTime" element={<LifeTime/>}/>                
                <Route path="/productType/add" element={<AddPage/>}/>
                <Route path="/productDivision/add" element={<AddPage/>}/>
                <Route path="/productGroup/add" element={<AddPage/>}/>
                <Route path="/productCategory/add" element={<AddPage/>}/>
                <Route path="/serviceProduct/add" element={<AddPage/>}/>
                <Route path="/serviceProductDetail/add" element={<AddPage/>}/>
                <Route path="/unitOfMeasure/add" element={<AddPage/>}/>                
                <Route path="/stockingCondition/add" element={<AddPage/>}/>
                <Route path="/abcCategory/add" element={<AddPage/>}/>
                <Route path="/xyzCategory/add" element={<AddPage/>}/>
                <Route path="/lifeTime/add" element={<AddPage/>}/>                
                <Route path="/productType/modify" element={<ModifyForm/>}/>
                <Route path="/productDivision/modify" element={<ModifyForm/>}/>
                <Route path="/productGroup/modify" element={<ModifyForm/>}/>
                <Route path="/productCategory/modify" element={<ModifyForm/>}/>
                <Route path="/serviceProduct/add" element={<ModifyForm/>}/>
                <Route path="/serviceProductDetail/modify" element={<ModifyForm/>}/>
                <Route path="/unitOfMeasure/modify" element={<ModifyForm/>}/>                
                <Route path="/stockingCondition/modify" element={<ModifyForm/>}/>
                <Route path="/abcCategory/modify" element={<ModifyForm/>}/>
                <Route path="/xyzCategory/modify" element={<ModifyForm/>}/>
                <Route path="/lifeTime/modify" element={<ModifyForm/>}/>   
                <Route path="/service" element={<Service/>}/>                                
                <Route path="/service/add" element={<AddPage/>}/>
                <Route path="/service/modify" element={<ModifyForm/>}/> 
                <Route path="/item" element={<Item/>}/>
                <Route path="/item/add" element={<AddPage/>}/>
                <Route path="/item/modify" element={<ModifyForm/>}/>
                <Route path="/itemApprovalType" element={<ItemApprovalType/>}/> 
                <Route path="/itemApprovalType/add" element={<AddPage/>}/>                
                <Route path="/itemApprovalType/modify" element={<ModifyForm/>}/>
                <Route path="/itemDespenseType" element={<ItemDespenseType/>}/> 
                <Route path="/itemDespenseType/add" element={<AddPage/>}/>                
                <Route path="/itemDespenseType/modify" element={<ModifyForm/>}/>
                <Route path="/materialRequest" element={<MaterialRequest/>}/> 
                <Route path="/materialRequest/add" element={<AddPage/>}/>                
                <Route path="/materialRequest/modify" element={<ModifyForm/>}/>
                <Route path="/materialRequestDetail" element={<MaterialRequestDetail/>}/> 
                <Route path="/materialRequestDetail/add" element={<AddPage/>}/>                
                <Route path="/materialRequestDetail/modify" element={<ModifyForm/>}/>
                <Route path="/materialRequestStatus" element={<MaterialRequestStatus/>}/> 
                <Route path="/materialRequestStatus/add" element={<AddPage/>}/>                
                <Route path="/materialRequestStatus/modify" element={<ModifyForm/>}/>
                <Route path="/productBatch" element={<ProductBatch/>}/> 
                <Route path="/productBatch/add" element={<AddPage/>}/>                
                <Route path="/productBatch/modify" element={<ModifyForm/>}/>
                <Route path="/productIssuance" element={<ProductIssuance/>}/> 
                <Route path="/productIssuance/add" element={<AddPage/>}/>                
                <Route path="/productIssuance/modify" element={<ModifyForm/>}/>
                <Route path="/productIssueStatus" element={<ProductIssueStatus/>}/> 
                <Route path="/productIssueStatus/add" element={<AddPage/>}/>                
                <Route path="/productIssueStatus/modify" element={<ModifyForm/>}/>
                <Route path="/storage" element={<Storage/>}/> 
                <Route path="/storage/add" element={<AddPage/>}/>                
                <Route path="/storage/modify" element={<ModifyForm/>}/>
                <Route path="/storageType" element={<StorageType/>}/> 
                <Route path="/storageType/add" element={<AddPage/>}/>                
                <Route path="/storageType/modify" element={<ModifyForm/>}/>
                <Route path="/employee" element={<Employee/>}/> 
                <Route path="/employee/add" element={<AddPage/>}/>                
                <Route path="/employee/modify" element={<ModifyForm/>}/>
                <Route path="/employeeStatus" element={<EmployeeStatus/>}/> 
                <Route path="/employeeStatus/add" element={<AddPage/>}/>                
                <Route path="/employeeStatus/modify" element={<ModifyForm/>}/>
                
            </Routes>
        </div>
    );
}
