import { PaymentDetailsComponent } from './Components/payment-details/payment-details.component';
import { CarSummaryDetailsComponent } from './Components/car-summary-details/car-summary-details.component';
import { CarCustomerDetailsComponent } from './Components/car-customer-details/car-customer-details.component';
import { CarRegistrationComponent } from './Components/car-registration/car-registration.component';
import { CarPremiumComponent } from './Components/car-premium/car-premium.component';
import { Routes } from '@angular/router';


export const carroute: Routes = [{
  path: "", 
  redirectTo: 'registration',
  component: CarRegistrationComponent
}, {
  path: "registration",
  component: CarRegistrationComponent
}, {
  path: "premium",
  component: CarPremiumComponent
}, {
  path: "customer-details",
  component: CarCustomerDetailsComponent
}, {
  path: "summary-details",
  component: CarSummaryDetailsComponent
},{
  path: "payment-details",
  component: PaymentDetailsComponent
}];