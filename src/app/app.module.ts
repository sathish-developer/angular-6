import { AuthGuardService } from './Common/services/auth.token.authorization.service';
import { LocalStorageService } from './commonservices/common.storage.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './Common/Modules/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRouteModule } from './AppRouteModule/app-route.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from './app.component';
import { LoginComponent, HeaderComponent } from './sharedmodules/components/header/header.component';
import { CommonService } from './commonservices/common.service';
import { StorageServiceModule, WebStorageService } from 'angular-webstorage-service';
import { pipeModule } from './Common/Modules/pipe/pipe.module';
import { DatePipe, LocationStrategy, HashLocationStrategy } from "@angular/common";







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouteModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    StorageServiceModule,
    pipeModule
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouteModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [CommonService,LocalStorageService,DatePipe,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthGuardService,
    multi:true
  }, {provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
