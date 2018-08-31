import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from '../sharedmodules/components/LandingPage/landing-page.component';


export const approute: Routes = [{
    path: "landing",
    component: LandingPageComponent
  }, {
    path: '', redirectTo: 'landing',
    pathMatch: 'full'
  }, {
    path: 'car',
    loadChildren: './../mainmodules/motors/Car/car.module#CarModule'
  },
  {
    path :'twowheeler',
    loadChildren : './../mainmodules/motors/Two Wheeler/twoWheeler.module#TwoWheelerModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(approute,{useHash:true}),
    FormsModule
  ],
  exports: [RouterModule],
  declarations: [LandingPageComponent]
})
export class AppRouteModule { }
