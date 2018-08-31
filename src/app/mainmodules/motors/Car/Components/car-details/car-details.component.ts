import { LocalStorageService } from './../../../../../commonservices/common.storage.service';
import { CarPremiumService } from './../../services/car.premium.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  selectedInsurerDetails={};
  userselectedCarDetails={};
  fuelType;
  constructor(private premium:CarPremiumService,private storage: LocalStorageService) { }

  ngOnInit() {
    this.selectedInsurerDetails=this.premium.getSelectedInsurer();
    this.fuelType=this.storage.getItem("fuelType");
    this.userselectedCarDetails=this.storage.getItem("carQuoteRequest");
    console.log(this.userselectedCarDetails);
  }

}
