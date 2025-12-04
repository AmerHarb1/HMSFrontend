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
            </Routes>
        </div>
    );
}