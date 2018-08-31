import { URLCONSTANT } from './../../../../../URLConstants/URL_Constant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  proposalNo="R22081800209";
  insurerCode="122";
  quoteNo="QPCV0000004355";
  amount="19715";
  productCode="PCV";
  intgQuoteNo="";
  intgCorrelationId="";
  PAYMENTURL=URLCONSTANT.INTEGRATION_PAYMENT_URL;
  constructor() { }

  ngOnInit() {
  }

   onSubmit(form:any,event:any){
    event.target.submit();
   }
}
