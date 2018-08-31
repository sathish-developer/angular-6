import { NumberOnlyDirective } from './../../../Common/directives/directive.numberonly.service';
import { PaymentDetailsComponent } from './Components/payment-details/payment-details.component';
import { NumberDirective } from './../../../Common/Modules/directives/common.numbers-only.directive';
import { pipeModule } from '../../../Common/Modules/pipe/pipe.module';
import { CarPremiumService } from './services/car.premium.service';
import { CarDropDownService } from './services/car.dropdown.service';
import { CarFormControlService } from './services/car.formcontrol.service';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarPremiumComponent, CarPremiumCompareInsurerDialog,
   CarPremiumBreakupDialog, CarPremiumIdvDialog, CarPremiumRecalcDialog } from './Components/car-premium/car-premium.component';
import { carroute } from "./car.routing";
import { CarRegistrationComponent } from './Components/car-registration/car-registration.component';
import { MaterialModule } from '../../../Common/Modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarCustomerDetailsComponent } from './Components/car-customer-details/car-customer-details.component';
import { CarDetailsComponent } from './Components/car-details/car-details.component';
import { CarInsurerDetailsComponent } from './Components/car-insurer-details/car-insurer-details.component';
import { CarSummaryDetailsComponent } from './Components/car-summary-details/car-summary-details.component';
import { StringOnlyDirective } from '../../../Common/directives/directive.stringonly.service';


/**
 * 
 * @author sathish kumar
 * 
 * **/

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(carroute),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    pipeModule
  ],
  exports: [RouterModule],
  declarations: [
    CarPremiumComponent, 
    CarRegistrationComponent,
    CarPremiumIdvDialog,
    CarPremiumBreakupDialog,
    CarPremiumCompareInsurerDialog,
    CarPremiumRecalcDialog,
    CarCustomerDetailsComponent,
    CarDetailsComponent,
    CarInsurerDetailsComponent,
    CarSummaryDetailsComponent,
    NumberOnlyDirective,
    StringOnlyDirective,
    PaymentDetailsComponent,
  ],
  providers:[CarFormControlService,CarDropDownService,CarPremiumService],
  entryComponents: [ 
    CarPremiumComponent,
    CarPremiumIdvDialog,
    CarPremiumBreakupDialog,
    CarPremiumCompareInsurerDialog,
    CarPremiumRecalcDialog
  ],
})
export class CarModule { }
