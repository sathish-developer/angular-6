export interface carQuoteRequest {
    CustomerDetails: CustomerDetails;
    QuotationData: QuotationData;
    VehicleDetails: VehicleDetails;
    CoverDetails: CoverDetails[];
    InsurerDetails: InsurerDetail[];
  }
  
  export interface InsurerDetail {
    insurerCode: string;
    insurerName: string;
    idv: number;
    minIdv: number;
    maxIdv: number;
    originalIdv: number;
    planName: string;
  }
  
  export interface VehicleDetails {
    engineNo: string;
    chassisNo: string;
    registrationNo: string;
    yearOfMfg: number;
    registrationDate: string;
    makeCode: string;
    modelCode: string;
    makeName: string;
    modelName: string;
    subModelName: string;
    subModelCode: string;
    engineCC: string;
    fuelType: string;
    rtoCode: string;
    rtoName: string;
    actualIdv: number;
    vehicleAge: number;
    seatingCapacity: string;
    cubicCapacity: string;
    zone: string;
    currentNCB: string;
    isInBuilt: string;
    isCarOwnerChanged: string;
    rtoNo: string;
    rtoRegistration: string;
    showRoomPrice: number;
    carrierType: string;
    noOfTraillers: string;
    regiAddress1:string;
    regiAddress2:string;
    regiAddress3:string;
    regiCityCode:string;
    regiCityName:string;
    regiAreaName:string;
    regiAreaCode:string;
    regiPinCode:string;
    regStateName:string;
    regStateCode:string;
    isCustomerAddress:boolean,
    financierType:string;
    financierCity:string;
    financierCode:string;
    financierName:string;
    trailerIdvDto: any[];
  }
  
  export interface QuotationData {
    quoteNo: string;
    lineOfBusiness: string;
    subLine: string;
    productCode: string;
    productName: string;
    businessType: string;
    policyStartDate: string;
    expiryDate: string;
    isVipPolicy: string;
    channelType: string;
    branchName: string;
    branchCode: string;
    quoteStatus: string;
    insurerCode: string;
    insurerName: string;
    intgQuotationNo: string;
    PreviousPolicyDetails: PreviousPolicyDetails;
  }
  
  export interface PreviousPolicyDetails {
    prevPolicyNo: string;
    prevPolicyExp: string;
    prevPolicyNcb: string;
    prevPolicyInsurerCode: string;
    prevPolicyInsurerName: string;
    isPrevPolicyClaim: string;
    prevPolicyType: string;
  }
  
  export interface CustomerDetails {
    firstName: string;
    lastName: string;
    mobileNo: string;
    email: string;
    customerType: string;
    aadharNumber: string;
    dateOfBirth: string;
    address1: string;
    address2: string;
    address3: string;
    areaCode: string;
    areaName: string;
    cityCode: string;
    cityName: string;
    stateName: string;
    stateCode: string;
    pinCode: string;
    panNumber:string;
    isAreaEdit:string;
    GSTIN:string;
    alternateEmail:string;
    alternateMobile:string;
    title:string;
    telePhone:string;
    eiaNumber:string;
    Nominee:Nominee;
  }

  export interface Nominee {
    nomineeName: string;
    nomineeDob: string;
    nomineeRelationship: string;
    guardianName: string;
    guardianDob: string;
    guardianRelationship: string;
  }

  export class CoverDetails{

  }