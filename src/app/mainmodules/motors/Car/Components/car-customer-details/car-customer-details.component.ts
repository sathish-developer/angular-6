import { CarFormControlService } from './../../services/car.formcontrol.service';
import { carQuoteRequest, CustomerDetails, Nominee } from './../../car-models/car.quote.request.model';
import { MatStepper } from '@angular/material';
import { LocalStorageService } from './../../../../../commonservices/common.storage.service';
import { CommonService } from './../../../../../commonservices/common.service';
import { URLCONSTANT } from './../../../../../URLConstants/URL_Constant';
import { Component, OnInit } from '@angular/core';
import {Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, UrlSegment, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-car-customer-details',
  templateUrl: './car-customer-details.component.html',
  styleUrls: ['./car-customer-details.component.css']
})
export class CarCustomerDetailsComponent implements OnInit {

  formGroup: FormGroup;
  proposerForm: AbstractControl;
  vehicleForm: AbstractControl;
  NomineeForm: AbstractControl;
  inspectionForm: AbstractControl;
  documentForm: AbstractControl;
  paymentForm: AbstractControl;
  formArray:AbstractControl;

  cityList=[];
  stateList=[];
  cityDropDownList=new Observable<any[]>();
  stateDropDownList;
  financierList;
  nomineeRelationshipList;
  guardianRelationshipList;
  constructor(private _formBuilder: FormBuilder, 
    public router: Router,
    public activatedroute:ActivatedRoute,
    public commonService:CommonService,
  public storage:LocalStorageService,public formservice:CarFormControlService) { }
  parentUrl:UrlSegment[];

  ngOnInit() {
    this.formGroup = this.formservice.getAllForm();
    this.commonService.getCityAndStateData((res)=>{
      this.filterCityandStateDropdown(res,(result)=>{
        this.cityList=result;
        this.stateList=result; 
      });
    });
     this.cityDropDownList = this.formGroup.get('formArray.0').get('cityName').valueChanges.pipe(startWith(''), map((data) => {
        const filterValue = data.toUpperCase();
        return this.cityList.filter(option => option.cityName.toUpperCase().includes(filterValue));
    }));

     this.stateDropDownList = this.formGroup.get('formArray.0').get('stateName').valueChanges.pipe(startWith(''), map((data) => {
       const filterValue = data.toUpperCase();
       return this.stateList.filter(option => option.stateName.toUpperCase().includes(filterValue));
     }));
      
     this.commonService.getNomineeRelatioshipDetails((res)=>{
       console.log(JSON.stringify(res));
       this.nomineeRelationshipList=res.relationship;
     });
     this.commonService.getFinancierDetails((res)=>{
       console.log(res);
       this.financierList=res.financierNameDto;
     });
    window.scrollTo(0, 0);
  }


  validateProposer(stepper:MatStepper){
    if(this.formGroup.get('formArray.0').valid){
      stepper.next();
    }
    else{
      console.log("error in forms");
    }
  }

  goVehicleDetails(){
    // here we need to set proposer details before vehicle details page render
    // as of now i have requested the static request
  }

 /*  filterNomineeRelationship(NomineeList,callback){
    var result=[];
    for(let i=0;i<NomineeList.length;i++){
      result.push(NomineeList[i].name);
    }
    return callback(result);
  } */

  getStatesBycityName(cityObject){
    this.formGroup.get('formArray.0').get('stateName').setValue(cityObject.stateName);
  }
  

  filterCityandStateDropdown(list,callback){
    var result=[];
    let cityList=list.cityMasterdtoList;
    for(let i=0;i<cityList.length-1;i++){
        result.push(cityList[i]);
    }
    return callback(result);
}


filterStateDropDown(list,callback){
  var filteredResult=[];
  for(let i=0;i<list.length-1;i++){
    if(list[i].stateName!=list[i+1].stateName){
      filteredResult.push(list[i]);
    }
  }
  //console.log(filteredResult);
  return filteredResult;
}


  updateUptoNomineeDetails(stepper:MatStepper){
  // here we need to set nominee details before vehicle details page render
  // as of now i have requested the static request
  this.proposerForm=this.formGroup.get('formArray.0').value;
  this.vehicleForm=this.formGroup.get('formArray.1').value;
  this.NomineeForm=this.formGroup.get('formArray.2').value;
  let quoterRequest=this.formservice.getMappedUptoNomineeDetails(this.proposerForm,this.vehicleForm,this.NomineeForm);
   console.log(JSON.stringify(quoterRequest));
   this.commonService.updateUptoNomineeDetails(quoterRequest).subscribe(nomineeResponse=>{
     //console.log(nomineeResponse);
     stepper.next();
   });
  }


  updateAllEnrichmentDetails(){
    // here we need to set update all enrichment details
    // as of now i have requested the static request
    // here we need request only vehicle details with quote no outside of vehicle object
    let quoteRequest={"quoteNo":"QPCC0000004466","VehicleDetails":{"insurerShortName":"TATA AIG","isInspectionRequired":"NO","inspectBy":"SELF","inspectionType":"","inspecDate":null,"inspecTime":null,"insPectionComments":null,"isInspectInfo":"NO","inspectReason":null,"inspectionAddress":"undefined,undefined,undefined,undefined,undefined","vehicleAvailableForIns":null,"trailerIdvDto":[]}};
    this.commonService.updateAllEnrichmentDetails(quoteRequest).subscribe(enrichmentresponse=>{
      // here we need to map the enrichment response 
    });
  }

  goToPaymentDetails(){
    this.activatedroute.parent.url.subscribe((URL) => {
      this.parentUrl = URL;
    });
    this.router.navigateByUrl(this.parentUrl + "/" + 'payment-details');
  }

  gotoSummaryDetails() {
    this.activatedroute.parent.url.subscribe((URL) => {
      this.parentUrl = URL;
    });
    this.router.navigateByUrl(this.parentUrl + "/" + 'summary-details');
  }

  goback()
  {
    this.activatedroute.parent.url.subscribe((URL) => {
      this.parentUrl = URL;
    });
    console.log("goback");
    this.router.navigate([this.parentUrl + "/" + 'premium']);
  }

  payment(){
    //window.location.href=URLCONSTANT.INTEGRATION_PAYMENT_URL;
    this.router.navigate(['/externalRedirect', { externalUrl: URLCONSTANT.INTEGRATION_PAYMENT_URL }], {
      skipLocationChange: true,
  });
  }
}
