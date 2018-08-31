import { CarPremiumService } from './../../services/car.premium.service';
import { LocalStorageService } from './../../../../../commonservices/common.storage.service';
import { VehicleDetails } from './../../car-models/car.quote.request.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-summary-details',
  templateUrl: './car-summary-details.component.html',
  styleUrls: ['./car-summary-details.component.css']
})
export class CarSummaryDetailsComponent implements OnInit {

  basicDetails:any={};
  proposalDetails={};
  VehicleDetails={};
  premiumDetails={};
  nomineeDetails={};
  documentDetails={};
  selectedInsurerDetails:any={};
  fueltype;
  constructor(private storage:LocalStorageService,private premium:CarPremiumService) { }

  ngOnInit() {
    
    this.basicDetails=this.storage.getItem("carQuoteRequest");
    this.selectedInsurerDetails=this.storage.getItem("selectedInsurer");
    this.fueltype=this.storage.getItem("fuelType");
    this.basicDetails.grosspremium=this.selectedInsurerDetails.grossPremium;
    window.scrollTo(0, 0);
  }

}
