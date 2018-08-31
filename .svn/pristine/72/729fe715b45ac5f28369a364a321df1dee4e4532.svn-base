import { CarPremiumService } from './../../services/car.premium.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-insurer-details',
  templateUrl: './car-insurer-details.component.html',
  styleUrls: ['./car-insurer-details.component.css']
})
export class CarInsurerDetailsComponent implements OnInit {

  selectedInsurerDetails:any={};
  constructor(private premium:CarPremiumService) { }

  ngOnInit() {
   this.selectedInsurerDetails=this.premium.getSelectedInsurer();
   console.log(this.selectedInsurerDetails);
  }

}
