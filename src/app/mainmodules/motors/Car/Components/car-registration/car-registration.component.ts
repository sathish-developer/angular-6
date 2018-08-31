import { carQuoteRequest, VehicleDetails, QuotationData, PreviousPolicyDetails, CoverDetails, CustomerDetails } from '../../car-models/car.quote.request.model';
import { CarPremiumService } from '../../services/car.premium.service';
import { CarDropDownService } from '../../services/car.dropdown.service';
import { constant } from '../../../../../commonservices/common.constant.service';
import { LocalStorageService } from '../../../../../commonservices/common.storage.service';
import { CommonService } from '../../../../../commonservices/common.service';
import { CarFormControlService } from '../../services/car.formcontrol.service';
import { Component, OnInit, HostListener,ElementRef } from '@angular/core';
import { MatStepper } from "@angular/material";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { select } from '../../car-models/car.dropdown.model';
import { DatePipe } from '@angular/common';
import { PrefferedInsurerRequest } from '../../car-models/car.prefferedInsurer.request.model';


@Component({
  selector: 'app-car-registration',
  templateUrl: './car-registration.component.html',
  styleUrls: ['./car-registration.component.css']
})
export class CarRegistrationComponent implements OnInit {
  isLinear = false;
  proposerForm: FormGroup;
  registrationForm: FormGroup;
  CarprefferedinsurerRequest = {} as PrefferedInsurerRequest;
  carQuoteRequest = {} as carQuoteRequest;
  subModelList;
  subModelArrayList = [];
  parentUrl: UrlSegment[];
  registeredNames: select[];
  manufacturings: select[];
  registrationMinDate: Date;
  registrationMaxDate: Date;
  policyExpiryMinDate: Date;
  policyExpiryMaxDate: Date;
  policyStartMinDate: Date;
  policyStartMaxDate: Date;
  policyEndMinDate: Date;
  policyEndMaxDate: Date;
  value;
  previousPolicysTypes: select[];
  previousInsuranceCompanys: select[] = [
    { value: 'Bajaj-0', viewValue: 'Bajaj' },
    { value: 'HDFC-1', viewValue: 'HDFC' },
    { value: 'ICICI-2', viewValue: 'ICICI' }
  ];

  makeDropDownList = [];
  previousInsurerDetailsList = [];
  makeModelArray = [];
  testControl: FormControl;
  constructor(private carFormControlService: CarFormControlService,
    public router: Router,
    public activatedroute: ActivatedRoute,
    public commonService: CommonService,
    public storage: LocalStorageService,
    public carDropdown: CarDropDownService,
    public premium: CarPremiumService,
    public datepipe: DatePipe,
    public elementRef:ElementRef) {
    console.log("car reloading");
  }
  makeModelViewList: Observable<any[]>;
  subModelViewList: Observable<any[]>;
  /* previousInsurerViewList:Observable<any[]>; */
  ngOnInit() {
    this.storage.removeAllItem();
    this.getPreviousPolicyExpiryDate('Rollover');
    this.commonService.filterRtoAndZoneBySublineCode('','',(res)=>{
      console.log(res);
    });
    this.CarprefferedinsurerRequest.productCode = constant.carProductCode;
    this.storage.setItem("prefferedInsurerRequest", this.CarprefferedinsurerRequest);
    let prefferedInsurerRequest = this.storage.getItem("prefferedInsurerRequest");
    this.commonService.getBundleDetailsData((data) => {

    });
    this.commonService.getPrefferedInsurer(prefferedInsurerRequest, (data) => {

    });
    this.carDropdown.getRegistredNames(response => {
      this.registeredNames = response;
    });
    this.carDropdown.getManufacturings(response => {
      this.manufacturings = response;
    });
    this.carDropdown.getPreviousPolicys(response => {
      this.previousPolicysTypes = response;
    });

    this.commonService.getPreviousInsurer((data) => {
      this.previousInsurerDetailsList = data;
    });

    this.makeDropDownList = this.commonService
      .getAllMakeAndModelListByProductCode(constant.sublineCode);
    this.commonService.getAllSubmodelBySubLineCode(constant.sublineCode, (response) => {
      this.subModelList = response;
      // this.getInitialSubModelDropDown(this.subModelList,(res)=>{
      //   this.subModelViewList=res;
      // });
    });
    this.proposerForm = this.carFormControlService.getCarProposerForm();
    this.registrationForm = this.carFormControlService.getCarRegistrationForm();

    this.makeModelViewList = this.proposerForm.get('makeName').valueChanges.pipe(startWith(''), map((data) => {
      const filterValue = data.toUpperCase();
      return this.makeDropDownList.filter(option => option.makeName.toUpperCase().includes(filterValue));
    }));

    this.subModelViewList = this.proposerForm.get('subModelName').valueChanges.pipe(startWith(''), map((data) => {
      const filterValue = data.toUpperCase();
      return this.subModelArrayList.filter(option => option.subModelName.toUpperCase().includes(filterValue));
    }));

    this.proposerForm.get('registrationNo').valueChanges.subscribe((data)=>{
    if(data.length==2 || data.length==5 || data.length==8){
      // console.log(this.elementRef.nativeElement);
      this.proposerForm.get('registrationNo').setValue(data+"-");
    }
    });
    /* this.previousInsurerViewList = this.registrationForm.get('prevPolicyInsurerName').valueChanges.pipe(startWith(''), map((data) => {
      const filterValue = data.toUpperCase();
      return this.previousInsurerDetailsList.filter(option => option.toUpperCase().includes(filterValue));
    })); */



    window.scrollTo(0, 0);
  }


  getManufacturingYear(year) {
    // this is for rollover registration date
    let date = year;
    console.log("current date" + new Date().getDate());
    console.log(date);
    this.registrationMaxDate = new Date(year, new Date().getMonth(), new Date().getDate());
    this.registrationMinDate = new Date(year);
  }


  getPreviousPolicyExpiryDate(businessType) {
    //this is for rollover previous policy expiry date
    let year = new Date().getFullYear() - 1;
    console.log("one year back" + year);
    this.policyExpiryMaxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 60);
    this.policyExpiryMinDate = new Date(year, new Date().getMonth(), new Date().getDate());
  }

  getUserExpiryDate(expiryDate: Date) {
    // this is for rollover
    let expirationDate = new Date(expiryDate);
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (expirationDate.getTime() === currentDate.getTime()) {
      this.registrationForm.get('policyStartDate').setValue(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1));
      this.registrationForm.get('expiryDate').setValue(new Date(expirationDate.getFullYear(), expirationDate.getMonth(), expirationDate.getDate() +365));
    }
    else if (expirationDate > currentDate) {
      this.registrationForm.get('policyStartDate').setValue(new Date(expirationDate.getFullYear(), expirationDate.getMonth(), expirationDate.getDate() + 1));
      this.registrationForm.get('expiryDate').setValue(new Date(expirationDate.getFullYear(), expirationDate.getMonth(), expirationDate.getDate() +365));
    }
    else {
      this.registrationForm.get('policyStartDate').setValue(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
      this.registrationForm.get('expiryDate').setValue(new Date(expirationDate.getFullYear(), expirationDate.getMonth(), expirationDate.getDate() +365));
    }
   // return currentDate;
  }


  getSubModel(event) {
    this.proposerForm.get('subModelName').reset();
  }


  getSubModelByMake(makeObject) {
    let selectedSubModelArrayList = [];
    let submodelList = this.subModelList.vehicleDetailsBySublineCode;
    for (let i = 0; i < submodelList.length; i++) {
      let submodelObject = submodelList[i];
      if (submodelObject.modelCode == makeObject.code) {
        selectedSubModelArrayList.push(submodelObject);
      }
    }
    return this.getSubModelDropDown(selectedSubModelArrayList);
  }


  goForwardRegistration(stepper: MatStepper) {
    if (this.proposerForm.valid) {
      let CustomerDetails = {} as CustomerDetails;
      this.carQuoteRequest.CustomerDetails = CustomerDetails;
      this.carQuoteRequest.VehicleDetails = this.proposerForm.value;
      //console.log("customer type"+this.proposerForm.controls['customerType'].value);
      this.carQuoteRequest.CustomerDetails.customerType = "CUSTOMER_" + this.proposerForm.controls['customerType'].value;
      this.carQuoteRequest.VehicleDetails.registrationDate = this.commonService.convertDateToStringFormat(this.proposerForm.controls['registrationDate'].value);
      console.log("registration form 1"+JSON.stringify(this.carQuoteRequest));
      this.storage.setItem("carQuoteRequest", this.carQuoteRequest);
      stepper.next();
    }
  }

  goForwardPremium(stepper: MatStepper) {
    if (this.registrationForm.valid) {
      let QuotationData = {} as QuotationData;
      let PreviousPolicyDetails = {} as PreviousPolicyDetails;
      this.carQuoteRequest.QuotationData = QuotationData;
      this.carQuoteRequest.CoverDetails = [];
      let policyStartDate = this.commonService.convertDateToStringFormat(this.registrationForm.controls['policyStartDate'].value);
      let expiryDate = this.commonService.convertDateToStringFormat(this.registrationForm.controls['expiryDate'].value);
      let prevPolicyExp = this.commonService.convertDateToStringFormat(this.registrationForm.controls['prevPolicyExp'].value);
      this.carQuoteRequest.QuotationData.PreviousPolicyDetails = PreviousPolicyDetails;
      this.carQuoteRequest.QuotationData.policyStartDate = policyStartDate;
      this.carQuoteRequest.QuotationData.expiryDate = expiryDate;
      this.carQuoteRequest.QuotationData.channelType = constant.channelType;
      this.carQuoteRequest.VehicleDetails.rtoName = this.registrationForm.controls['rtoName'].value;
      this.carQuoteRequest.QuotationData.PreviousPolicyDetails.prevPolicyExp = prevPolicyExp;
      this.carQuoteRequest.QuotationData.PreviousPolicyDetails.prevPolicyType = this.registrationForm.controls['prevPolicyType'].value;
      this.carQuoteRequest.QuotationData.PreviousPolicyDetails.prevPolicyInsurerName = this.registrationForm.controls['prevPolicyInsurerName'].value;
      //console.log("complete form" + JSON.stringify(this.carQuoteRequest));
      let quoteRequest:any = { "CustomerDetails": { "firstName": "", "lastName": "", "mobileNo": "", "email": "", "customerType": "CUSTOMER_INDIVIDUAL", "aadharNumber": "--", "dateOfBirth": "", "address1": "", "address2": "", "address3": "", "areaCode": "", "areaName": "", "cityCode": "", "cityName": "", "stateName": "", "stateCode": "", "pinCode": "" }, "QuotationData": { "quoteNo": "QPCC0000003617", "lineOfBusiness": "MOTOR", "subLine": "PRIVATE CAR", "productCode": "PCC", "productName": "COMPREHENSIVE", "businessType": "RollOver", "policyStartDate": "01/09/2018", "expiryDate": "31/08/2019", "isVipPolicy": "N", "channelType": "POT", "branchName": "", "branchCode": "", "quoteStatus": "QUOTE", "insurerCode": "128", "insurerName": "", "intgQuotationNo": "Q/H/3121/0000046252", "policyTenure": "1", "PreviousPolicyDetails": { "prevPolicyNo": "", "prevPolicyExp": "31/08/2018", "prevPolicyNcb": "20", "prevPolicyInsurerCode": "104", "prevPolicyInsurerName": "BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD.", "isPrevPolicyClaim": "N", "prevPolicyType": "COMPREHENSIVE" } }, "VehicleDetails": { "engineNo": "", "chassisNo": "", "registrationNo": "MH-01-FS-1878", "yearOfMfg": 2017, "registrationDate": "01/08/2017", "makeCode": "RLT", "modelCode": "MD000335", "makeName": "RENAULT", "modelName": "KWID", "subModelName": "RXL", "subModelCode": "SM00003189", "engineCC": "799", "fuelType": "PETROL", "rtoCode": "MH01", "rtoName": "MUMBAI", "actualIdv": 0, "vehicleAge": 1.09, "seatingCapacity": "5", "cubicCapacity": "799", "zone": "ZONE A", "currentNCB": "25", "isInBuilt": "false", "isCarOwnerChanged": "N", "rtoNo": "MH01", "rtoRegistration": "MUMBAI", "showRoomPrice": 0, "carrierType": "", "noOfTraillers": "", "trailerIdvDto": [] }, "CoverDetails": [], "InsurerDetails": [] };
     // this.storage.setItem("carQuoteRequest", this.carQuoteRequest);
      this.storage.setItem("carQuoteRequest", quoteRequest);

      this.onclickCarRegistration(quoteRequest);
    }
  }
  onclickCarRegistration(quoterequest:carQuoteRequest) {
      this.commonService.saveQuoteDetails(quoterequest).subscribe((quoteResponse:any)=>{
        //quoterequest['quoteNo']=quoteResponse.quoteNo;
        quoterequest.QuotationData.quoteNo=quoteResponse.quoteNo;
        this.storage.setItem("carQuoteRequest",quoterequest);
        this.activatedroute.parent.url.subscribe((URL) => {
          this.parentUrl = URL;
        });
        this.router.navigateByUrl(this.parentUrl + "/" + 'premium');
      });
  }


  getSubModelDropDown(selectedSubModelList) {
    this.subModelArrayList = [];
    if (selectedSubModelList.length > 0) {
      for (let index = 0; index < selectedSubModelList.length; index++) {
        var details = '';
        var petrolOrDiseal = '';
        if (selectedSubModelList[index].fuelType == 'DIESEL') {
          petrolOrDiseal = "(D)";
        } else if (selectedSubModelList[index].fuelType == 'PETROL') {
          petrolOrDiseal = "(P)";
        }
        details = selectedSubModelList[index].subModelName + "," + selectedSubModelList[index].engineCC + "," + petrolOrDiseal + "," + selectedSubModelList[index].seatingCapacity;
        selectedSubModelList[index].subModelAndTypeName = details;
        this.subModelArrayList.push(selectedSubModelList[index]);
      }
    }
    return this.subModelArrayList;
  }


  getInitialSubModelDropDown(submodelList, callback?) {
    //let submodelArrayList=submodelList.vehicleDetailsBySublineCode;
    let submodelArrayList = this.subModelList.vehicleDetailsBySublineCode;
    for (let index = 0; index < submodelArrayList.length; index++) {
      var details = '';
      var petrolOrDiseal = '';
      if (submodelArrayList[index].fuelType == 'DIESEL') {
        petrolOrDiseal = "(D)";
      } else if (submodelArrayList[index].fuelType == 'PETROL') {
        petrolOrDiseal = "(P)";
      }
      details = submodelArrayList[index].subModelName + "," + submodelArrayList[index].engineCC + "," + petrolOrDiseal + "," + submodelArrayList[index].seatingCapacity;
      submodelArrayList[index].subModelAndTypeName = details;
      this.subModelArrayList.push(submodelArrayList[index]);
    }
    return callback(this.subModelArrayList);
  }





}
