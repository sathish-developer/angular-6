import { Nominee, PreviousPolicyDetails } from './../car-models/car.quote.request.model';
import { LocalStorageService } from './../../../../commonservices/common.storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from "@angular/core";



@Injectable()
export class CarFormControlService {


  aadhaarRegex="/^([0-9]([0-9]([0-9]([0-9]([0-9]([0-9]([0-9]([0-9]([0-9]([0-9]([0-9]([0-9])?)?)?)?)?)?)?)?)?)?)?)?$/";

  constructor(private formBuilder: FormBuilder, public storage: LocalStorageService) { }
  getCarProposerForm() {
    return this.formBuilder.group({
      registrationNo: ['', Validators.required],
      customerType: ['', Validators.required],
      yearOfMfg: ['', Validators.required],
      registrationDate: ['', Validators.required],
      makeName: ['', Validators.required],
      subModelName: ['', Validators.required]
    });
  }
  getCarRegistrationForm() {
    return this.formBuilder.group({
      rtoName: ['', Validators.required],
      prevPolicyType: ['', Validators.required],
      prevPolicyInsurerName: ['', Validators.required],
      prevPolicyExp: ['', Validators.required],
      policyStartDate: ['', Validators.required],
      expiryDate: ['', Validators.required]
    });

  }


  getAllForm() {
    return this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          aadharNumber: ['',Validators.compose([Validators.required])],
          //aadharNumber: ['',Validators.compose([Validators.required,Validators.maxLength(12)])],
          firstName: [''],
          lastName: [''],
          dateOfBirth: [''],
          address1: [''],
          address2: [''],
          address3: [''],
          cityName: [''],
          stateName: [''],
          areaName: [''],
          pinCode: [''],
          mobileNo: [''],
          alternateMobile: [''],
          panNumber: [''],
          telePhone: [''],
          email: [''],
          alternateEmail: [''],
          eiaNumber: [''],
          GSTIN: [''],
        }),
        this.formBuilder.group({
          registrationNo: ['fdsf'],
          engineNo: ['fdsf'],
          chassisNo: ['fdsf'],
          prevPolicyInsurerName: ['fdsf'],
          prevPolicyNo: ['fdsf'],
          regiAddress1: ['ds'],
          regiAddress2: ['fds'],
          regiAddress3: ['fds'],
          regiCityName: ['fsd'],
          regStateName: ['fsdf'],
          regiAreaName: ['fsdf'],
          regiPinCode: ['fdsf'],
        }),
        this.formBuilder.group({
          nomineeName: ['fdsf'],
          nomineeDob: ['fdsf'],
          nomineeRelationship: ['fdsf'],
          guardianName: ['fdsf'],
          guardianDob: ['fdsf'],
          guardianRelationship: ['fdsf'],
          financierType: ['HYPOTHECATION'],
          financierCity: ['fdsf'],
          financierName: [''],
        }),
        this.formBuilder.group({
          emailFormCtrl: ['fdsf'],
        }),
        this.formBuilder.group({
          emailFormCtrl: ['fdsf'],
        }),
        this.formBuilder.group({
          emailFormCtrl: ['fdsf'],
        }),
      ])
    });
  }


  getMappedUptoNomineeDetails(proposerForm, vehicleForm, NomineeForm) {
    let quoteRequest: any = this.storage.getItem("carQuoteRequest");
    quoteRequest.CustomerDetails.aadharNumber = proposerForm['aadharNumber'];
    quoteRequest.CustomerDetails.firstName = proposerForm['firstName'];
    quoteRequest.CustomerDetails.lastName = proposerForm['lastName'];
    quoteRequest.CustomerDetails.dateOfBirth = proposerForm['dateOfBirth'];
    quoteRequest.CustomerDetails.address1 = proposerForm['address1'];
    quoteRequest.CustomerDetails.address2 = proposerForm['address2'];
    quoteRequest.CustomerDetails.address3 = proposerForm['address3'];
    quoteRequest.CustomerDetails.cityName = proposerForm['cityName'];
    quoteRequest.CustomerDetails.stateName = proposerForm['stateName'];
    quoteRequest.CustomerDetails.areaName = proposerForm['areaName'];
    quoteRequest.CustomerDetails.pinCode = proposerForm['pinCode'];
    quoteRequest.CustomerDetails.mobileNo = proposerForm['mobileNo'];
    quoteRequest.CustomerDetails.alternateMobile = proposerForm['alternateMobile'];
    quoteRequest.CustomerDetails.panNumber = proposerForm['panNumber'];
    quoteRequest.CustomerDetails.telePhone = proposerForm['telePhone'];
    quoteRequest.CustomerDetails.email = proposerForm['email'];
    quoteRequest.CustomerDetails.alternateEmail = proposerForm['alternateEmail'];
    quoteRequest.CustomerDetails.eiaNumber = proposerForm['eiaNumber'];
    quoteRequest.CustomerDetails.GSTIN = proposerForm['GSTIN'];

    //setting vehicle Details

    quoteRequest.VehicleDetails.registrationNo = vehicleForm['registrationNo'];
    quoteRequest.VehicleDetails.engineNo = proposerForm['engineNo'];
    quoteRequest.VehicleDetails.chassisNo = proposerForm['chassisNo'];
    quoteRequest.VehicleDetails.regiAddress1 = proposerForm['regiAddress1'];
    quoteRequest.VehicleDetails.regiAddress2 = proposerForm['regiAddress2'];
    quoteRequest.VehicleDetails.regiAddress3 = proposerForm['regiAddress3'];
    quoteRequest.VehicleDetails.regiCityName = proposerForm['regiCityName'];
    quoteRequest.VehicleDetails.regStateName = proposerForm['regStateName'];
    quoteRequest.VehicleDetails.regiAreaName = proposerForm['regiAreaName'];
    quoteRequest.VehicleDetails.regiPinCode = proposerForm['regiPinCode'];
    quoteRequest.VehicleDetails.regiAreaName = proposerForm['regiAreaName'];

    //setting previous insurer Details
    let PreviousPolicyDetails = {} as PreviousPolicyDetails;
    PreviousPolicyDetails.prevPolicyInsurerName = vehicleForm['prevPolicyInsurerName'];
    PreviousPolicyDetails.prevPolicyNo = vehicleForm['prevPolicyNo'];
    quoteRequest['PreviousPolicyDetails'] = PreviousPolicyDetails;

    // setting nominee details
    let Nominee = {} as Nominee;
    Nominee.nomineeName = NomineeForm['nomineeName'];
    Nominee.nomineeDob = NomineeForm['nomineeDob'];
    Nominee.nomineeRelationship = NomineeForm['nomineeRelationship'];
    Nominee.guardianName = NomineeForm['guardianName'];
    Nominee.guardianDob = NomineeForm['guardianDob'];
    Nominee.guardianRelationship = NomineeForm['guardianRelationship'];
    quoteRequest.CustomerDetails['Nominee'] = Nominee;
    quoteRequest['quoteNo'] = quoteRequest.QuotationData.quoteNo;
    return quoteRequest;
  }




}
