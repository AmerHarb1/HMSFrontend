import { Routes, Route } from 'react-router'
import './AppPage.css';

import { Dashboard } from '../pages/Dashboard';
import { ExceptionPage } from '../components/ExceptionPage';
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
import  {Master } from '../components/Master';
import  {MasterDetails } from '../components/MasterDetails';
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
import { ExternalBranch } from '../pages/ExternalBranch';
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
import { Product } from '../pages/Product';
import { Item } from '../pages/Item';
import { ProductType } from '../pages/ProductType';
import { ProductDivision } from '../pages/ProductDivision';
import { ProductGroup } from '../pages/ProductGroup';                
import { ProductCategory } from '../pages/ProductCategory';
import { UnitOfMeasure } from '../pages/UnitOfMeasure';
import { AbcCategory } from '../pages/AbcCategory';
import { LifeTimeType } from '../pages/LifeTimeType';
import { StockingCondition } from '../pages/StockingCondition';
import { XyzCategory } from '../pages/XyzCategory';
import { ProductComponent } from '../pages/ProductComponent';
import { ProductComponentDetail } from '../pages/ProductComponentDetail';
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
import { PurchaseStatus } from '../pages/PurchaseStatus';
import { PurchaseOrder } from '../pages/PurchaseOrder';
import { ReceivePurchaseOrder } from '../pages/ReceivePurchaseOrder';
import { Vendor } from '../pages/Vendor';
import { ProductSupplier } from '../pages/ProductSupplier';
import { QuotationRequest } from '../pages/QuotationRequest';
import { QuotationResponse } from '../pages/QuotationResponse';
import { Icd10Block } from '../pages/Icd10Block';
import { Icd10Category } from '../pages/Icd10Category';
import { Icd10Chapter } from '../pages/Icd10Chapter';
import { Icd10Diagnoses } from '../pages/Icd10Diagnoses';
import { Icd10Level } from '../pages/Icd10Level';
import { ProductIcd10Relation } from '../pages/ProductIcd10Relation';
import { ProductRequestApproval } from '../pages/ProductRequestApproval';
import { ProductRequestPriority } from '../pages/ProductRequestPriority';
import { ApproveMaterialRequest } from '../pages/ApproveMaterialRequest';
import { QuotationRequestStatus } from '../pages/QuotationRequestStatus';
import { QuotationResponseStatus } from '../pages/QuotationResponseStatus';
import { ApproveQuotationResponse } from '../pages/ApproveQuotationResponse';
import { ApproveQuotationResponseStatus } from '../pages/ApproveQuotationResponseStatus';
import { ReceivePurchaseOrderStatus } from '../pages/ReceivePurchaseOrderStatus';
import { CostMethod } from '../pages/CostMethod';
import { CostCenterInventory } from '../pages/CostCenterInventory';
import { VendorInvoiceDetail } from '../pages/VendorInvoiceDetail';
import { VendorInvoice } from '../pages/VendorInvoice';
import { VendorPayment } from '../pages/VendorPayment';
import { TransactionDetail } from '../pages/TransactionDetail';
import { Transaction } from '../pages/Transaction';
import { TransactionType } from '../pages/TransactionType';
import { ProductUseType } from '../pages/ProductUseType';
import { ReceiveMaterialRequest } from '../pages/ReceiveMaterialRequest';
import { Ethnicity } from '../pages/Ethnicity';
import { EmploymentType } from '../pages/EmploymentType';
import { BloodType } from '../pages/BloodType';
import { EyeColor } from '../pages/EyeColor';
import { HairColor } from '../pages/HairColor';
import { Race } from '../pages/Race';
import { Patient } from '../pages/Patient';
import { PatientStatus } from '../pages/PatientStatus';
import { Gender } from '../pages/Gender';
import { Clinic } from '../pages/Clinic';
import { ClinicDoctors } from '../pages/ClinicDoctors';
import { ClinicRoom } from '../pages/ClinicRoom';
import { ClinicRoomType } from '../pages/ClinicRoomType';
import { MedicalSubSpecialty } from '../pages/MedicalSubSpecialty';
import { MedicalSpecialty } from '../pages/MedicalSpecialty';
import { Doctor } from '../pages/Doctor';
import { DoctorType } from '../pages/DoctorType';
import { DoctorPositionType } from '../pages/DoctorPositionType';
import { Bed } from '../pages/Bed';
import { Room } from '../pages/Room';
import { Ward } from '../pages/Ward';
import { Floor } from '../pages/Floor';
import { Building } from '../pages/Building';
import { DrugInteractionType } from '../pages/DrugInteractionType';
import { DrugInteraction } from '../pages/DrugInteraction';
import { ProductDrugDetail } from '../pages/ProductDrugDetail';
import { DrugConsumptionFrequency } from '../pages/DrugConsumptionFrequency';
import { DrugConsumptionRoute } from '../pages/DrugConsumptionRoute';
import { PaymentType } from '../pages/PaymentType';
import { DoctorVisitType } from '../pages/DoctorVisitType';
import { InsuranceCompany } from '../pages/InsuranceCompany';
import { DrugRestriction } from '../pages/DrugRestriction';
import { DoctorVisit } from '../pages/DoctorVisit';
import { DoctorVisitOrder } from '../pages/DoctorVisitOrder';
import { DoctorVisitDiagnoses } from '../pages/DoctorVisitDiagnoses';
import { PatientMedicationSearch } from '../pages/PatientMedicationSearch';
import { PatientMedication } from '../pages/PatientMedication';
import { PatientMedicationDetail } from '../pages/PatientMedicationDetail';
import { PatientDiagnoses } from '../pages/PatientDiagnoses';
import { User } from '../pages/User';
import { PatientSearch } from '../pages/PatientSearch';
import { DoctorVisitTabs } from '../pages/DoctorVisitTabs';
import { Person } from '../pages/Person';
import { PatientInsurance } from '../pages/PatientInsurance';
import { PatientCreditCard } from '../pages/PatientCreditCard';
import { PersonEmail } from '../pages/PersonEmail';
import { PersonPhone } from '../pages/PersonPhone';
import { PersonAddress } from '../pages/PersonAddress';
import { CreditCardType } from '../pages/CreditCardType';
import { InsuranceType } from '../pages/InsuranceType';
import { InsureeType } from '../pages/InsureeType';
import { DoctorVisitView } from '../pages/DoctorVisitView';
import { DoctorVisitSearch } from '../pages/DoctorVisitSearch';
import { InsurancePlan } from '../pages/InsurancePlan';
import { CoverageRule } from '../pages/CoverageRule';
import { CoverageRuleDetail } from '../pages/CoverageRuleDetail';
import { CoverageRuleDiagnoses } from '../pages/CoverageRuleDiagnoses';
import { PatientPlanAccumulator } from '../pages/PatientPlanAccumulator';
import { PatientPlanAccumulatorDetail } from '../pages/PatientPlanAccumulatorDetail';
import { DoctorNetworkType } from '../pages/DoctorNetworkType';
import { PlanBenefitCategory } from '../pages/PlanBenefitCategory';
import { PatientVisitType } from '../pages/PatientVisitType';
import { DoctorVisitFollowupPeriod } from '../pages/DoctorVisitFollowupPeriod';
import { DoctorVisitTran } from '../pages/DoctorVisitTran';
import { CoverageClinic } from '../pages/CoverageClinic';
import { InsuranceAuthorizationRequest } from '../pages/InsuranceAuthorizationRequest';
import { InsuranceAuthorizationType } from '../pages/InsuranceAuthorizationType';
import { InsuranceAuthorizationStatus } from '../pages/InsuranceAuthorizationStatus';
import { AppointmentSessionLength } from '../pages/AppointmentSessionLength';
import { AppointmentStatus } from '../pages/AppointmentStatus';
import { AppointmentSlot } from '../pages/AppointmentSlot';
import { AppointmentHourSlot } from '../pages/AppointmentHourSlot';
import { AppointmentDoctorDay } from '../pages/AppointmentDoctorDay';
import { AppointmentDoctorHourBlockSlot } from '../pages/AppointmentDoctorHourBlockSlot';
import { AppointmentDoctorHourBlock } from '../pages/AppointmentDoctorHourBlock';
import { DoctorAppointmentParameter } from '../pages/DoctorAppointmentParameter';
import { Appointment } from '../pages/Appointment';
import { Hospital } from '../pages/Hospital';
import { AdmissionReferral } from '../pages/AdmissionReferral';
import { AdmissionRequest } from '../pages/AdmissionRequest';
import { AdmissionRequestStatus } from '../pages/AdmissionRequestStatus';
import { Admission } from '../pages/Admission';
import { AdmissionSearch } from '../pages/AdmissionSearch';
import { AdmissionType } from '../pages/AdmissionType';
import { AdmissionStatus } from '../pages/AdmissionStatus';
import { AdmissionReferralReason } from '../pages/AdmissionReferralReason';
import { OrgType } from '../pages/OrgType';
import { InPatient } from '../pages/InPatient';
import { InPatientTabs } from '../pages/InPatientTabs';
import { InPatientDoctor } from '../pages/InPatientDoctor';
import { PersonRelationType } from '../pages/PersonRelationType';
import { PersonNextOfKin } from '../pages/PersonNextOfKin';
import { InPatientDoctorAssignmentType } from '../pages/InPatientDoctorAssignmentType';
import { InPatientVisitType } from '../pages/InPatientVisitType';
import { OutOfRoomType } from '../pages/OutOfRoomType';
import { ProductComponentType } from '../pages/ProductComponentType';
import { SpecimenType } from '../pages/SpecimenType';
import { InPatientLabOrderNoRequestSearch } from '../pages/InPatientLabOrderNoRequestSearch';
import { OutPatientLabOrderNoRequestSearch } from '../pages/OutPatientLabOrderNoRequestSearch';
import { InPatientLabOrderNoRequest } from '../pages/InPatientLabOrderNoRequest';
import { OutPatientLabOrderNoRequest } from '../pages/OutPatientLabOrderNoRequest';
import { LabTest } from '../pages/LabTest';
import { LabRequest } from '../pages/LabRequest';
import { LabResult } from '../pages/LabResult';
import { LabResultUnitType } from '../pages/LabResultUnitType';
import { InPatientXrayOrderNoRequestSearch } from '../pages/InPatientXrayOrderNoRequestSearch';
import { OutPatientXrayOrderNoRequestSearch } from '../pages/OutPatientXrayOrderNoRequestSearch';
import { InPatientXrayOrderNoRequest } from '../pages/InPatientXrayOrderNoRequest';
import { OutPatientXrayOrderNoRequest } from '../pages/OutPatientXrayOrderNoRequest';
import { XrayTest } from '../pages/XrayTest';
import { XrayRequest } from '../pages/XrayRequest';
import { XrayResult } from '../pages/XrayResult';
import { Drug } from '../pages/Drug';
import { PatientDrugRestriction } from '../pages/PatientDrugRestriction';
import { XrayDoctorReport } from '../pages/XrayDoctorReport';
import { XrayResultStatus } from '../pages/XrayResultStatus';
import { ImageType } from '../pages/ImageType';
import { ProductInventoryComponent } from '../pages/ProductInventoryComponent';
import { ProductInventoryComponentSearch } from '../pages/ProductInventoryComponentSearch';
import { ProductInventoryComponentDetail } from '../pages/ProductInventoryComponentDetail';
import { ProductSearch } from '../pages/ProductSearch';
import { SearchTarget } from './SearchTarget';

export function AppRoutes(){
    return(
        <div className="AppRoutes">
            <Routes>
                <Route index element={<Dashboard/>}/> {/* index = path="/"*/}
                <Route path="/exception" element={<ExceptionPage />} />
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
                <Route path="/externalBranch" element={<ExternalBranch/>}/>
                <Route path="/externalBranch/add" element={<AddPage/>}/>
                <Route path="/externalBranch/modify" element={<ModifyForm/>}/>
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
                <Route path="/unitOfMeasure" element={<UnitOfMeasure/>}/>                
                <Route path="/stockingCondition" element={<StockingCondition/>}/>
                <Route path="/abcCategory" element={<AbcCategory/>}/>
                <Route path="/xyzCategory" element={<XyzCategory/>}/>
                <Route path="/lifeTimeType" element={<LifeTimeType/>}/>                
                <Route path="/productType/add" element={<AddPage/>}/>
                <Route path="/productDivision/add" element={<AddPage/>}/>
                <Route path="/productGroup/add" element={<AddPage/>}/>
                <Route path="/productCategory/add" element={<AddPage/>}/>

                <Route path="/ProductComponent" element={<ProductComponent/>}/>                
                <Route path="/ProductComponent/add" element={<AddPage/>}/>
                <Route path="/ProductComponent/modify" element={<ModifyForm/>}/>

                <Route path="/ProductComponentDetail" element={<ProductComponent/>}/>
                <Route path="/ProductComponentDetail/add" element={<AddPage/>}/>
                <Route path="/ProductComponentDetail/modify" element={<ModifyForm/>}/>
                <Route path="/unitOfMeasure/add" element={<AddPage/>}/>                
                <Route path="/stockingCondition/add" element={<AddPage/>}/>
                <Route path="/abcCategory/add" element={<AddPage/>}/>
                <Route path="/xyzCategory/add" element={<AddPage/>}/>
                <Route path="/lifeTimeType/add" element={<AddPage/>}/>                
                <Route path="/productType/modify" element={<ModifyForm/>}/>
                <Route path="/productDivision/modify" element={<ModifyForm/>}/>
                <Route path="/productGroup/modify" element={<ModifyForm/>}/>
                <Route path="/productCategory/modify" element={<ModifyForm/>}/>                
                <Route path="/unitOfMeasure/modify" element={<ModifyForm/>}/>                
                <Route path="/stockingCondition/modify" element={<ModifyForm/>}/>
                <Route path="/abcCategory/modify" element={<ModifyForm/>}/>
                <Route path="/xyzCategory/modify" element={<ModifyForm/>}/>
                <Route path="/lifeTimeType/modify" element={<ModifyForm/>}/>  
                <Route path="/Product" element={<Product/>}/> 
                <Route path="/Product/add" element={<AddPage/>}/>                
                <Route path="/Product/modify" element={<ModifyForm/>}/>

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
                <Route path="/materialRequest/add" element={<Master/>}/>                
                <Route path="/materialRequest/modify" element={<Master/>}/>
                <Route path="/materialRequestDetail" element={<MaterialRequestDetail/>}/> 
                <Route path="/materialRequestDetail/add" element={<AddPage/>}/>                
                <Route path="/materialRequestDetail/modify" element={<ModifyForm/>}/>
                <Route path="/materialRequestStatus" element={<MaterialRequestStatus/>}/> 
                <Route path="/materialRequestStatus/add" element={<AddPage/>}/>                
                <Route path="/materialRequestStatus/modify" element={<ModifyForm/>}/>
                <Route path="/productBatch" element={<ProductBatch/>}/> 
                <Route path="/productBatch/add" element={<AddPage/>}/>                
                <Route path="/productBatch/modify" element={<ModifyForm/>}/>
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
                <Route path="/PurchaseStatus" element={<PurchaseStatus/>}/> 
                <Route path="/PurchaseStatus/add" element={<AddPage/>}/>                
                <Route path="/PurchaseStatus/modify" element={<ModifyForm/>}/>
                <Route path="/PurchaseOrder" element={<PurchaseOrder/>}/> 
                <Route path="/PurchaseOrder/add" element={<AddPage/>}/>                
                <Route path="/PurchaseOrder/modify" element={<ModifyForm/>}/>
                <Route path="/ReceivePurchaseOrder" element={<ReceivePurchaseOrder/>}/> 
                <Route path="/ReceivePurchaseOrder/add" element={<AddPage/>}/>                
                <Route path="/ReceivePurchaseOrder/modify" element={<ModifyForm/>}/>
                <Route path="/Vendor" element={<Vendor/>}/> 
                <Route path="/Vendor/add" element={<AddPage/>}/>                
                <Route path="/Vendor/modify" element={<ModifyForm/>}/>
                <Route path="/ProductSupplier" element={<ProductSupplier/>}/> 
                <Route path="/ProductSupplier/add" element={<AddPage/>}/>                
                <Route path="/ProductSupplier/modify" element={<ModifyForm/>}/>
                <Route path="/QuotationRequest" element={<QuotationRequest/>}/> 
                <Route path="/QuotationRequest/add" element={<AddPage/>}/>                
                <Route path="/QuotationRequest/modify" element={<ModifyForm/>}/>
                <Route path="/QuotationResponse" element={<QuotationResponse/>}/> 
                <Route path="/QuotationResponse/add" element={<AddPage/>}/>                
                <Route path="/QuotationResponse/modify" element={<ModifyForm/>}/>
                
                <Route path="/Icd10Block" element={<Icd10Block/>}/> 
                <Route path="/Icd10Block/add" element={<AddPage/>}/>                
                <Route path="/Icd10Block/modify" element={<ModifyForm/>}/>

                <Route path="/Icd10Category" element={<Icd10Category/>}/> 
                <Route path="/Icd10Category/add" element={<AddPage/>}/>                
                <Route path="/Icd10Category/modify" element={<ModifyForm/>}/>

                <Route path="/Icd10Chapter" element={<Icd10Chapter/>}/> 
                <Route path="/Icd10Chapter/add" element={<AddPage/>}/>                
                <Route path="/Icd10Chapter/modify" element={<ModifyForm/>}/>

                <Route path="/Icd10Diagnoses" element={<Icd10Diagnoses/>}/> 
                <Route path="/Icd10Diagnoses/add" element={<AddPage/>}/>                
                <Route path="/Icd10Diagnoses/modify" element={<ModifyForm/>}/>

                <Route path="/Icd10Level" element={<Icd10Level/>}/> 
                <Route path="/Icd10Level/add" element={<AddPage/>}/>                
                <Route path="/Icd10Level/modify" element={<ModifyForm/>}/>

                <Route path="/ProductIcd10Relation" element={<ProductIcd10Relation/>}/> 
                <Route path="/ProductIcd10Relation/add" element={<AddPage/>}/>                
                <Route path="/ProductIcd10Relation/modify" element={<ModifyForm/>}/>

                <Route path="/ProductRequestApproval" element={<ProductRequestApproval/>}/> 
                <Route path="/ProductRequestApproval/add" element={<AddPage/>}/>                
                <Route path="/ProductRequestApproval/modify" element={<ModifyForm/>}/>

                <Route path="/ProductRequestPriority" element={<ProductRequestPriority/>}/> 
                <Route path="/ProductRequestPriority/add" element={<AddPage/>}/>                
                <Route path="/ProductRequestPriority/modify" element={<ModifyForm/>}/>

                <Route path="/ApproveMaterialRequest" element={<ApproveMaterialRequest/>}/>    
                <Route path="/ApproveMaterialRequest/modify" element={<Master/>}/>

                <Route path="/ApproveQuotationResponse" element={<ApproveQuotationResponse/>}/>    
                <Route path="/ApproveQuotationResponse/modify" element={<Master/>}/>

                <Route path="/productIssuance" element={<ProductIssuance/>}/>  
                <Route path="/productIssuance/entry" element={<ModifyForm/>}/>         
                <Route path="/productIssuance/modify" element={<Master/>}/>

                <Route path="/QuotationRequestStatus" element={<QuotationRequestStatus/>}/> 
                <Route path="/QuotationRequestStatus/add" element={<AddPage/>}/>                
                <Route path="/QuotationRequestStatus/modify" element={<ModifyForm/>}/>

                <Route path="/QuotationResponseStatus" element={<QuotationResponseStatus/>}/> 
                <Route path="/QuotationResponseStatus/add" element={<AddPage/>}/>                
                <Route path="/QuotationResponseStatus/modify" element={<ModifyForm/>}/>

                <Route path="/ApproveQuotationResponseStatus" element={<ApproveQuotationResponseStatus/>}/> 
                <Route path="/ApproveQuotationResponseStatus/add" element={<AddPage/>}/>                
                <Route path="/ApproveQuotationResponseStatus/modify" element={<ModifyForm/>}/>

                <Route path="/ReceivePurchaseOrderStatus" element={<ReceivePurchaseOrderStatus/>}/> 
                <Route path="/ReceivePurchaseOrderStatus/add" element={<AddPage/>}/>                
                <Route path="/ReceivePurchaseOrderStatus/modify" element={<ModifyForm/>}/>

                <Route path="/QuotationRequestStatus" element={<QuotationRequestStatus/>}/> 
                <Route path="/QuotationRequestStatus/add" element={<AddPage/>}/>                
                <Route path="/QuotationRequestStatus/modify" element={<ModifyForm/>}/>

                <Route path="/TransactionType" element={<TransactionType/>}/> 
                <Route path="/TransactionType/add" element={<AddPage/>}/>                
                <Route path="/TransactionType/modify" element={<ModifyForm/>}/>

                <Route path="/Transaction" element={<Transaction/>}/> 
                <Route path="/Transaction/add" element={<AddPage/>}/>                
                <Route path="/Transaction/modify" element={<ModifyForm/>}/>

                <Route path="/TransactionDetail" element={<TransactionDetail/>}/> 
                <Route path="/TransactionDetail/add" element={<AddPage/>}/>                
                <Route path="/TransactionDetail/modify" element={<ModifyForm/>}/>

                <Route path="/VendorPayment" element={<VendorPayment/>}/> 
                <Route path="/VendorPayment/add" element={<AddPage/>}/>                
                <Route path="/VendorPayment/modify" element={<ModifyForm/>}/>

                <Route path="/VendorInvoice" element={<VendorInvoice/>}/> 
                <Route path="/VendorInvoice/add" element={<AddPage/>}/>                
                <Route path="/VendorInvoice/modify" element={<ModifyForm/>}/>

                <Route path="/VendorInvoiceDetail" element={<VendorInvoiceDetail/>}/> 
                <Route path="/VendorInvoiceDetail/add" element={<AddPage/>}/>                
                <Route path="/VendorInvoiceDetail/modify" element={<ModifyForm/>}/>

                <Route path="/CostCenterInventory" element={<CostCenterInventory/>}/> 
                <Route path="/CostCenterInventory/add" element={<AddPage/>}/>                
                <Route path="/CostCenterInventory/modify" element={<ModifyForm/>}/>

                <Route path="/CostMethod" element={<CostMethod/>}/> 
                <Route path="/CostMethod/add" element={<AddPage/>}/>                
                <Route path="/CostMethod/modify" element={<ModifyForm/>}/>

                <Route path="/ProductUseType" element={<ProductUseType/>}/> 
                <Route path="/ProductUseType/add" element={<AddPage/>}/>                
                <Route path="/ProductUseType/modify" element={<ModifyForm/>}/>

                <Route path="/ReceiveMaterialRequest" element={<ReceiveMaterialRequest/>}/> 
                <Route path="/ReceiveMaterialRequest/add" element={<AddPage/>}/>                
                <Route path="/ReceiveMaterialRequest/modify" element={<ModifyForm/>}/>

                <Route path="/Race" element={<Race/>}/> 
                <Route path="/Race/add" element={<AddPage/>}/>                
                <Route path="/Race/modify" element={<ModifyForm/>}/>

                <Route path="/HairColor" element={<HairColor/>}/> 
                <Route path="/HairColor/add" element={<AddPage/>}/>                
                <Route path="/HairColor/modify" element={<ModifyForm/>}/>

                <Route path="/EyeColor" element={<EyeColor/>}/> 
                <Route path="/EyeColor/add" element={<AddPage/>}/>                
                <Route path="/EyeColor/modify" element={<ModifyForm/>}/>

                <Route path="/BloodType" element={<BloodType/>}/> 
                <Route path="/BloodType/add" element={<AddPage/>}/>                
                <Route path="/BloodType/modify" element={<ModifyForm/>}/>

                <Route path="/EmploymentType" element={<EmploymentType/>}/> 
                <Route path="/EmploymentType/add" element={<AddPage/>}/>                
                <Route path="/EmploymentType/modify" element={<ModifyForm/>}/>

                <Route path="/Ethnicity" element={<Ethnicity/>}/> 
                <Route path="/Ethnicity/add" element={<AddPage/>}/>                
                <Route path="/Ethnicity/modify" element={<ModifyForm/>}/>

                <Route path="/Patient" element={<Patient/>}/> 
                <Route path="/Patient/add" element={<AddPage/>}/>                
                <Route path="/Patient/modify" element={<ModifyForm/>}/>

                <Route path="/PatientStatus" element={<PatientStatus/>}/> 
                <Route path="/PatientStatus/add" element={<AddPage/>}/>                
                <Route path="/PatientStatus/modify" element={<ModifyForm/>}/>

                <Route path="/Gender" element={<Gender/>}/> 
                <Route path="/Gender/add" element={<AddPage/>}/>                
                <Route path="/Gender/modify" element={<ModifyForm/>}/>

                <Route path="/Clinic" element={<Clinic/>}/> 
                <Route path="/Clinic/add" element={<AddPage/>}/>                
                <Route path="/Clinic/modify" element={<ModifyForm/>}/>

                <Route path="/ClinicDoctors" element={<ClinicDoctors/>}/> 
                <Route path="/ClinicDoctors/add" element={<AddPage/>}/>                
                <Route path="/ClinicDoctors/modify" element={<ModifyForm/>}/>

                <Route path="/ClinicRoom" element={<ClinicRoom/>}/> 
                <Route path="/ClinicRoom/add" element={<AddPage/>}/>                
                <Route path="/ClinicRoom/modify" element={<ModifyForm/>}/>

                <Route path="/ClinicRoomType" element={<ClinicRoomType/>}/> 
                <Route path="/ClinicRoomType/add" element={<AddPage/>}/>                
                <Route path="/ClinicRoomType/modify" element={<ModifyForm/>}/>

                <Route path="/MedicalSubSpecialty" element={<MedicalSubSpecialty/>}/> 
                <Route path="/MedicalSubSpecialty/add" element={<AddPage/>}/>                
                <Route path="/MedicalSubSpecialty/modify" element={<ModifyForm/>}/>

                <Route path="/MedicalSpecialty" element={<MedicalSpecialty/>}/> 
                <Route path="/MedicalSpecialty/add" element={<AddPage/>}/>                
                <Route path="/MedicalSpecialty/modify" element={<ModifyForm/>}/>

                <Route path="/Doctor" element={<Doctor/>}/> 
                <Route path="/Doctor/add" element={<AddPage/>}/>                
                <Route path="/Doctor/modify" element={<ModifyForm/>}/>

                <Route path="/DoctorType" element={<DoctorType/>}/> 
                <Route path="/DoctorType/add" element={<AddPage/>}/>                
                <Route path="/DoctorType/modify" element={<ModifyForm/>}/>
                
                <Route path="/DoctorPositionType" element={<DoctorPositionType/>}/> 
                <Route path="/DoctorPositionType/add" element={<AddPage/>}/>                
                <Route path="/DoctorPositionType/modify" element={<ModifyForm/>}/>

                <Route path="/Bed" element={<Bed/>}/> 
                <Route path="/Bed/add" element={<AddPage/>}/>                
                <Route path="/Bed/modify" element={<ModifyForm/>}/>

                <Route path="/Room" element={<Room/>}/> 
                <Route path="/Room/add" element={<AddPage/>}/>                
                <Route path="/Room/modify" element={<ModifyForm/>}/>

                <Route path="/Ward" element={<Ward/>}/> 
                <Route path="/Ward/add" element={<AddPage/>}/>                
                <Route path="/Ward/modify" element={<ModifyForm/>}/>

                <Route path="/Floor" element={<Floor/>}/> 
                <Route path="/Floor/add" element={<AddPage/>}/>                
                <Route path="/Floor/modify" element={<ModifyForm/>}/>

                <Route path="/Building" element={<Building/>}/> 
                <Route path="/Building/add" element={<AddPage/>}/>                
                <Route path="/Building/modify" element={<ModifyForm/>}/>

                <Route path="/DoctorVisitType" element={<DoctorVisitType/>}/> 
                <Route path="/DoctorVisitType/add" element={<AddPage/>}/>                
                <Route path="/DoctorVisitType/modify" element={<ModifyForm/>}/>
                
                <Route path="/PaymentType" element={<PaymentType/>}/> 
                <Route path="/PaymentType/add" element={<AddPage/>}/>                
                <Route path="/PaymentType/modify" element={<ModifyForm/>}/>

                <Route path="/DrugConsumptionRoute" element={<DrugConsumptionRoute/>}/> 
                <Route path="/DrugConsumptionRoute/add" element={<AddPage/>}/>                
                <Route path="/DrugConsumptionRoute/modify" element={<ModifyForm/>}/>

                <Route path="/DrugConsumptionFrequency" element={<DrugConsumptionFrequency/>}/> 
                <Route path="/DrugConsumptionFrequency/add" element={<AddPage/>}/>                
                <Route path="/DrugConsumptionFrequency/modify" element={<ModifyForm/>}/>

                <Route path="/ProductDrugDetail" element={<ProductDrugDetail/>}/> 
                <Route path="/ProductDrugDetail/add" element={<AddPage/>}/>                
                <Route path="/ProductDrugDetail/modify" element={<ModifyForm/>}/>

                <Route path="/DrugInteraction" element={<DrugInteraction/>}/> 
                <Route path="/DrugInteraction/add" element={<AddPage/>}/>                
                <Route path="/DrugInteraction/modify" element={<ModifyForm/>}/>

                <Route path="/DrugInteractionType" element={<DrugInteractionType/>}/> 
                <Route path="/DrugInteractionType/add" element={<AddPage/>}/>                
                <Route path="/DrugInteractionType/modify" element={<ModifyForm/>}/>

                <Route path="/InsuranceCompany" element={<InsuranceCompany/>}/> 
                <Route path="/InsuranceCompany/add" element={<AddPage/>}/>                
                <Route path="/InsuranceCompany/modify" element={<ModifyForm/>}/>

                <Route path="/PatientDiagnoses" element={<PatientDiagnoses/>}/> 
                <Route path="/PatientDiagnoses/add" element={<AddPage/>}/>                
                <Route path="/PatientDiagnoses/modify" element={<ModifyForm/>}/>

                <Route path="/PatientMedicationSearch" element={<PatientMedicationSearch/>}/>
                
                <Route path="/PatientMedication" element={<PatientMedication/>}/> 
                <Route path="/PatientMedication/add" element={<Master/>}/>                
                <Route path="/PatientMedication/modify" element={<Master/>}/>

                <Route path="/PatientMedicationDetail" element={<PatientMedicationDetail/>}/> 
                <Route path="/PatientMedicationDetail/add" element={<PatientMedicationDetail/>}/>                
                <Route path="/PatientMedicationDetail/modify" element={<PatientMedicationDetail/>}/>

                <Route path="/ProductDrugDetail" element={<ProductDrugDetail/>}/> 
                <Route path="/ProductDrugDetail/add" element={<AddPage/>}/>                
                <Route path="/ProductDrugDetail/modify" element={<ModifyForm/>}/>

                <Route path="/DoctorVisitDiagnoses" element={<DoctorVisitDiagnoses/>}/> 
                <Route path="/DoctorVisitDiagnoses/add" element={<AddPage/>}/>                
                <Route path="/DoctorVisitDiagnoses/modify" element={<ModifyForm/>}/>

                <Route path="/DoctorVisitOrder" element={<DoctorVisitOrder/>}/> 
                <Route path="/DoctorVisitOrder/add" element={<AddPage/>}/>                
                <Route path="/DoctorVisitOrder/modify" element={<ModifyForm/>}/>

                <Route path="/DoctorVisit" element={<DoctorVisit/>}/> 
                <Route path="/DoctorVisit/add" element={<AddPage/>}/>                
                <Route path="/DoctorVisit/modify" element={<ModifyForm/>}/>

                <Route path="/DrugRestriction" element={<DrugRestriction/>}/> 
                <Route path="/DrugRestriction/add" element={<AddPage/>}/>                
                <Route path="/DrugRestriction/modify" element={<ModifyForm/>}/>

                <Route path="/User" element={<User/>}/> 
                <Route path="/User/add" element={<AddPage/>}/>                
                <Route path="/User/modify" element={<ModifyForm/>}/>

                <Route path="/PatientSearch" element={<PatientSearch/>}/> 
                <Route path="/DoctorVisitTabs" element={<DoctorVisitTabs/>}/>

                <Route path="/Person" element={<Person/>}/> 
                <Route path="/Person/add" element={<AddPage/>}/>                
                <Route path="/Person/modify" element={<ModifyForm/>}/>

                <Route path="/PatientInsurance" element={<PatientInsurance/>}/> 
                <Route path="/PatientInsurance/add" element={<AddPage/>}/>                
                <Route path="/PatientInsurance/modify" element={<ModifyForm/>}/>

                <Route path="/PatientCreditCard" element={<PatientCreditCard/>}/> 
                <Route path="/PatientCreditCard/add" element={<AddPage/>}/>                
                <Route path="/PatientCreditCard/modify" element={<ModifyForm/>}/>

                <Route path="/PersonEmail" element={<PersonEmail/>}/> 
                <Route path="/PersonEmail/add" element={<AddPage/>}/>                
                <Route path="/PersonEmail/modify" element={<ModifyForm/>}/>

                <Route path="/PersonPhone" element={<PersonPhone/>}/> 
                <Route path="/PersonPhone/add" element={<AddPage/>}/>                
                <Route path="/PersonPhone/modify" element={<ModifyForm/>}/>

                <Route path="/PersonAddress" element={<PersonAddress/>}/> 
                <Route path="/PersonAddress/add" element={<AddPage/>}/>                
                <Route path="/PersonAddress/modify" element={<ModifyForm/>}/>

                <Route path="/CreditCardType" element={<CreditCardType/>}/> 
                <Route path="/CreditCardType/add" element={<AddPage/>}/>                
                <Route path="/CreditCardType/modify" element={<ModifyForm/>}/>

                <Route path="/InsuranceType" element={<InsuranceType/>}/> 
                <Route path="/InsuranceType/add" element={<AddPage/>}/>                
                <Route path="/InsuranceType/modify" element={<ModifyForm/>}/>

                <Route path="/InsureeType" element={<InsureeType/>}/> 
                <Route path="/InsureeType/add" element={<AddPage/>}/>                
                <Route path="/InsureeType/modify" element={<ModifyForm/>}/>

                <Route path="/DoctorVisitView" element={<DoctorVisitView/>}/> 
                <Route path="/DoctorVisitView/add" element={<DoctorVisit/>}/>                
                <Route path="/DoctorVisitView/modify" element={<DoctorVisitTabs/>}/>

                <Route path="/DoctorVisitSearch" element={<DoctorVisitSearch/>}/> 
                <Route path="/DoctorVisitSearch/add" element={<AddPage/>}/>                
                <Route path="/DoctorVisitSearch/modify" element={<DoctorVisitTabs/>}/>

                <Route path="/InsurancePlan" element={<InsurancePlan/>}/> 
                <Route path="/InsurancePlan/add" element={<AddPage/>}/>                
                <Route path="/InsurancePlan/modify" element={<ModifyForm/>}/>

                <Route path="/CoverageRule" element={<CoverageRule/>}/> 
                <Route path="/CoverageRule/add" element={<AddPage/>}/>                
                <Route path="/CoverageRule/modify" element={<ModifyForm/>}/>

                <Route path="/CoverageRuleDetail" element={<CoverageRuleDetail/>}/> 
                <Route path="/CoverageRuleDetail/add" element={<AddPage/>}/>                
                <Route path="/CoverageRuleDetail/modify" element={<ModifyForm/>}/>

                <Route path="/CoverageRuleDiagnoses" element={<CoverageRuleDiagnoses/>}/> 
                <Route path="/CoverageRuleDiagnoses/add" element={<AddPage/>}/>                
                <Route path="/CoverageRuleDiagnoses/modify" element={<ModifyForm/>}/>

                <Route path="/PatientPlanAccumulator" element={<PatientPlanAccumulator/>}/> 
                <Route path="/PatientPlanAccumulator/add" element={<AddPage/>}/>                
                <Route path="/PatientPlanAccumulator/modify" element={<ModifyForm/>}/>

                <Route path="/PatientPlanAccumulatorDetail" element={<PatientPlanAccumulatorDetail/>}/> 
                <Route path="/PatientPlanAccumulatorDetail/add" element={<AddPage/>}/>                
                <Route path="/PatientPlanAccumulatorDetail/modify" element={<ModifyForm/>}/>

                <Route path="/DoctorNetworkType" element={<DoctorNetworkType/>}/> 
                <Route path="/DoctorNetworkType/add" element={<AddPage/>}/>                
                <Route path="/DoctorNetworkType/modify" element={<ModifyForm/>}/>

                <Route path="/PlanBenefitCategory" element={<PlanBenefitCategory/>}/> 
                <Route path="/PlanBenefitCategory/add" element={<AddPage/>}/>                
                <Route path="/PlanBenefitCategory/modify" element={<ModifyForm/>}/>

                <Route path="/PatientVisitType" element={<PatientVisitType/>}/> 
                <Route path="/PatientVisitType/add" element={<AddPage/>}/>                
                <Route path="/PatientVisitType/modify" element={<DoctorVisitTabs/>}/>

                <Route path="/DoctorVisitFollowupPeriod" element={<DoctorVisitFollowupPeriod/>}/> 
                <Route path="/DoctorVisitFollowupPeriod/add" element={<AddPage/>}/>                
                <Route path="/DoctorVisitFollowupPeriod/modify" element={<DoctorVisitTabs/>}/>

                <Route path="/CoverageClinic" element={<CoverageClinic/>}/> 
                <Route path="/CoverageClinic/add" element={<AddPage/>}/>                
                <Route path="/CoverageClinic/modify" element={<ModifyForm/>}/>

                <Route path="/InsuranceAuthorizationRequest" element={<InsuranceAuthorizationRequest/>}/> 
                <Route path="/InsuranceAuthorizationRequest/add" element={<AddPage/>}/>                
                <Route path="/InsuranceAuthorizationRequest/modify" element={<ModifyForm/>}/>

                <Route path="/InsuranceAuthorizationType" element={<InsuranceAuthorizationType/>}/> 
                <Route path="/InsuranceAuthorizationType/add" element={<AddPage/>}/>                
                <Route path="/InsuranceAuthorizationType/modify" element={<ModifyForm/>}/>

                <Route path="/InsuranceAuthorizationStatus" element={<InsuranceAuthorizationStatus/>}/> 
                <Route path="/InsuranceAuthorizationStatus/add" element={<AddPage/>}/>                
                <Route path="/InsuranceAuthorizationStatus/modify" element={<ModifyForm/>}/>

                <Route path="/DoctorVisitTran" element={<DoctorVisitTran/>}/> 

                <Route path="/AppointmentDoctorHourBlock" element={<AppointmentDoctorHourBlock/>}/> 
                <Route path="/AppointmentDoctorHourBlock/add" element={<AddPage/>}/>                
                <Route path="/AppointmentDoctorHourBlock/modify" element={<ModifyForm/>}/>

                <Route path="/AppointmentDoctorHourBlockSlot" element={<AppointmentDoctorHourBlockSlot/>}/> 
                <Route path="/AppointmentDoctorHourBlockSlot/add" element={<AddPage/>}/>                
                <Route path="/AppointmentDoctorHourBlockSlot/modify" element={<ModifyForm/>}/>

                <Route path="/AppointmentDoctorDay" element={<AppointmentDoctorDay/>}/> 
                <Route path="/AppointmentDoctorDay/add" element={<AddPage/>}/>                
                <Route path="/AppointmentDoctorDay/modify" element={<ModifyForm/>}/>

                <Route path="/AppointmentHourSlot" element={<AppointmentHourSlot/>}/> 
                <Route path="/AppointmentHourSlot/add" element={<AddPage/>}/>                
                <Route path="/AppointmentHourSlot/modify" element={<ModifyForm/>}/>

                <Route path="/AppointmentSlot" element={<AppointmentSlot/>}/> 
                <Route path="/AppointmentSlot/add" element={<AddPage/>}/>                
                <Route path="/AppointmentSlot/modify" element={<ModifyForm/>}/>

                <Route path="/AppointmentStatus" element={<AppointmentStatus/>}/> 
                <Route path="/AppointmentStatus/add" element={<AddPage/>}/>                
                <Route path="/AppointmentStatus/modify" element={<ModifyForm/>}/>

                <Route path="/AppointmentSessionLength" element={<AppointmentSessionLength/>}/> 
                <Route path="/AppointmentSessionLength/add" element={<AddPage/>}/>                
                <Route path="/AppointmentSessionLength/modify" element={<ModifyForm/>}/>

                <Route path="/DoctorAppointmentParameter" element={<DoctorAppointmentParameter/>}/> 
                <Route path="/DoctorAppointmentParameter/add" element={<AddPage/>}/>                
                <Route path="/DoctorAppointmentParameter/modify" element={<ModifyForm/>}/>

                <Route path="/Appointment" element={<Appointment/>}/> 

                <Route path="/Hospital" element={<Hospital/>}/> 
                <Route path="/Hospital/add" element={<AddPage/>}/>                
                <Route path="/Hospital/modify" element={<ModifyForm/>}/>

                <Route path="/AdmissionReferral" element={<AdmissionReferral/>}/> 
                <Route path="/AdmissionReferral/add" element={<AddPage/>}/>                
                <Route path="/AdmissionReferral/modify" element={<ModifyForm/>}/>

                <Route path="/AdmissionRequest" element={<AdmissionRequest/>}/> 
                <Route path="/AdmissionRequest/add" element={<AddPage/>}/>                
                <Route path="/AdmissionRequest/modify" element={<ModifyForm/>}/>

                <Route path="/AdmissionRequestStatus" element={<AdmissionRequestStatus/>}/> 
                <Route path="/AdmissionRequestStatus/add" element={<AddPage/>}/>                
                <Route path="/AdmissionRequestStatus/modify" element={<ModifyForm/>}/>

                <Route path="/AdmissionSearch" element={<AdmissionSearch/>}/>
                <Route path="/Admission" element={<Admission/>}/>  
                <Route path="/Admission/add" element={<AddPage/>}/>                
                <Route path="/Admission/modify" element={<ModifyForm/>}/>

                <Route path="/AdmissionType" element={<AdmissionType/>}/> 
                <Route path="/AdmissionType/add" element={<AddPage/>}/>                
                <Route path="/AdmissionType/modify" element={<ModifyForm/>}/>

                <Route path="/AdmissionStatus" element={<AdmissionStatus/>}/> 
                <Route path="/AdmissionStatus/add" element={<AddPage/>}/>                
                <Route path="/AdmissionStatus/modify" element={<ModifyForm/>}/>

                <Route path="/AdmissionReferralReason" element={<AdmissionReferralReason/>}/> 
                <Route path="/AdmissionReferralReason/add" element={<AddPage/>}/>                
                <Route path="/AdmissionReferralReason/modify" element={<ModifyForm/>}/>

                <Route path="/OrgType" element={<OrgType/>}/> 
                <Route path="/OrgType/add" element={<AddPage/>}/>                
                <Route path="/OrgType/modify" element={<ModifyForm/>}/>

                <Route path="/InPatient" element={<InPatient/>}/> 
                <Route path="/InPatientTabs" element={<InPatientTabs/>}/> 

                <Route path="/InPatientDoctorAssignmentType" element={<InPatientDoctorAssignmentType/>}/> 
                <Route path="/InPatientDoctorAssignmentType/add" element={<AddPage/>}/>                
                <Route path="/InPatientDoctorAssignmentType/modify" element={<ModifyForm/>}/>

                <Route path="/PersonNextOfKin" element={<PersonNextOfKin/>}/> 
                <Route path="/PersonNextOfKin/add" element={<AddPage/>}/>                
                <Route path="/PersonNextOfKin/modify" element={<ModifyForm/>}/>

                <Route path="/InPatientDoctor" element={<InPatientDoctor/>}/> 
                <Route path="/InPatientDoctor/add" element={<AddPage/>}/>                
                <Route path="/InPatientDoctor/modify" element={<ModifyForm/>}/>
                
                <Route path="/PersonRelationType" element={<PersonRelationType/>}/> 
                <Route path="/PersonRelationType/add" element={<AddPage/>}/>                
                <Route path="/PersonRelationType/modify" element={<ModifyForm/>}/>

                <Route path="/InPatientVisitType" element={<InPatientVisitType/>}/> 
                <Route path="/InPatientVisitType/add" element={<AddPage/>}/>                
                <Route path="/InPatientVisitType/modify" element={<ModifyForm/>}/>

                <Route path="/OutOfRoomType" element={<OutOfRoomType/>}/> 
                <Route path="/OutOfRoomType/add" element={<AddPage/>}/>                
                <Route path="/OutOfRoomType/modify" element={<ModifyForm/>}/>

                <Route path="/ProductComponentType" element={<ProductComponentType/>}/> 
                <Route path="/ProductComponentType/add" element={<AddPage/>}/>                
                <Route path="/ProductComponentType/modify" element={<ModifyForm/>}/>

                <Route path="/SpecimenType" element={<SpecimenType/>}/> 
                <Route path="/SpecimenType/add" element={<AddPage/>}/>                
                <Route path="/SpecimenType/modify" element={<ModifyForm/>}/>

                <Route path="/LabTest" element={<LabTest/>}/> 
                <Route path="/LabTest/add" element={<AddPage/>}/>                
                <Route path="/LabTest/modify" element={<ModifyForm/>}/>

                <Route path="/LabRequest" element={<LabRequest/>}/> 
                <Route path="/LabRequest/add" element={<AddPage/>}/>                
                <Route path="/LabRequest/modify" element={<ModifyForm/>}/>

                <Route path="/LabResult" element={<LabResult/>}/> 
                <Route path="/LabResult/add" element={<AddPage/>}/>                
                <Route path="/LabResult/modify" element={<ModifyForm/>}/>

                <Route path="/LabResultUnitType" element={<LabResultUnitType/>}/> 
                <Route path="/LabResultUnitType/add" element={<AddPage/>}/>                
                <Route path="/LabResultUnitType/modify" element={<ModifyForm/>}/>

                <Route path="/InPatientLabOrderNoRequestSearch" element={<InPatientLabOrderNoRequestSearch/>}/> 
                <Route path="/OutPatientLabOrderNoRequestSearch" element={<OutPatientLabOrderNoRequestSearch/>}/> 

                <Route path="/InPatientLabOrderNoRequest" element={<InPatientLabOrderNoRequest/>}/>     
                <Route path="/InPatientLabOrderNoRequest/modify" element={<Master/>}/>

                <Route path="/OutPatientLabOrderNoRequest" element={<OutPatientLabOrderNoRequest/>}/>     
                <Route path="/OutPatientLabOrderNoRequest/modify" element={<Master/>}/>

                <Route path="/XrayTest" element={<XrayTest/>}/> 
                <Route path="/XrayTest/add" element={<AddPage/>}/>                
                <Route path="/XrayTest/modify" element={<ModifyForm/>}/>

                <Route path="/XrayRequest" element={<XrayRequest/>}/> 
                <Route path="/XrayRequest/add" element={<AddPage/>}/>                
                <Route path="/XrayRequest/modify" element={<ModifyForm/>}/>

                <Route path="/XrayResult" element={<XrayResult/>}/> 
                <Route path="/XrayResult/add" element={<AddPage/>}/>                
                <Route path="/XrayResult/modify" element={<ModifyForm/>}/>

                <Route path="/InPatientXrayOrderNoRequestSearch" element={<InPatientXrayOrderNoRequestSearch/>}/> 
                <Route path="/OutPatientXrayOrderNoRequestSearch" element={<OutPatientXrayOrderNoRequestSearch/>}/> 

                <Route path="/InPatientXrayOrderNoRequest" element={<InPatientXrayOrderNoRequest/>}/>     
                <Route path="/InPatientXrayOrderNoRequest/modify" element={<Master/>}/>

                <Route path="/OutPatientXrayOrderNoRequest" element={<OutPatientXrayOrderNoRequest/>}/>     
                <Route path="/OutPatientXrayOrderNoRequest/modify" element={<Master/>}/>

                <Route path="/Drug" element={<Drug/>}/> 
                <Route path="/Drug/add" element={<AddPage/>}/>                
                <Route path="/Drug/modify" element={<ModifyForm/>}/>

                <Route path="/PatientDrugRestriction" element={<PatientDrugRestriction/>}/> 
                <Route path="/PatientDrugRestriction/add" element={<AddPage/>}/>                
                <Route path="/PatientDrugRestriction/modify" element={<ModifyForm/>}/>

                <Route path="/XrayDoctorReport" element={<XrayDoctorReport/>}/> 
                <Route path="/XrayDoctorReport/add" element={<AddPage/>}/>                
                <Route path="/XrayDoctorReport/modify" element={<ModifyForm/>}/>

                <Route path="/XrayResultStatus" element={<XrayResultStatus/>}/> 
                <Route path="/XrayResultStatus/add" element={<AddPage/>}/>                
                <Route path="/XrayResultStatus/modify" element={<ModifyForm/>}/>

                <Route path="/ImageType" element={<ImageType/>}/> 
                <Route path="/ImageType/add" element={<AddPage/>}/>                
                <Route path="/ImageType/modify" element={<ModifyForm/>}/>

                <Route path="/ProductInventoryComponentDetail" element={<ProductInventoryComponentDetail/>}/> 
                <Route path="/ProductInventoryComponentDetail/add" element={<AddPage/>}/>                
                <Route path="/ProductInventoryComponentDetail/modify" element={<ModifyForm/>}/>

                <Route path="/ProductInventoryComponent" element={<ProductInventoryComponent/>}/> 
                <Route path="/ProductInventoryComponent/add" element={<Master/>}/>                
                <Route path="/ProductInventoryComponent/modify" element={<Master/>}/>

                <Route path="/ProductSearch" element={<ProductSearch/>}/> 
                <Route path="/SearchTarget" element={<SearchTarget/>}/> 
                <Route path="/ProductInventoryComponentSearch" element={<ProductInventoryComponentSearch/>}/> 

            </Routes>
        </div>
    );
}














