import { TwoWheelerSummaryDetailsComponent } from './Components/twoWheeler-summary-details/twoWheeler-summary-details.component';
import { TwoWheelerCustomerDetailsComponent } from './Components/twoWheeler-customer-details/twoWheeler-customer-details.component';
import { TwoWheelerRegistrationComponent } from './Components/twoWheeler-registration/twoWheeler-registration.component';
import { TwoWheelerPremiumComponent } from './Components/twoWheeler-premium/twoWheeler-premium.component';
import { Routes } from '@angular/router';


export const twoWheelerroute: Routes = [{
  path: "", 
  redirectTo: 'registration',
  component: TwoWheelerRegistrationComponent
}, {
  path: "registration",
  component: TwoWheelerRegistrationComponent
}, {
  path: "premium",
  component: TwoWheelerPremiumComponent
}, {
  path: "customer-details",
  component: TwoWheelerCustomerDetailsComponent
}, {
  path: "summary-details",
  component: TwoWheelerSummaryDetailsComponent
}];