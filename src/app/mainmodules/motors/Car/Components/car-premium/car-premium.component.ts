import { CommonService } from './../../../../../commonservices/common.service';
import { carQuoteRequest } from './../../car-models/car.quote.request.model';
import { constant } from '../../../../../commonservices/common.constant.service';
import { LocalStorageService } from '../../../../../commonservices/common.storage.service';
import { CarPremiumService } from '../../services/car.premium.service';
import { Component, OnInit, Inject, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSidenav } from '@angular/material';
import { Router, UrlSegment, ActivatedRoute } from '@angular/router';



/**
 * 
 * @author sathish kumar
 * 
 * **/


export interface DialogData {
  idv_amt: number;
}

//export var premiumBreakUpList:any={};

@Component({
  selector: 'car-premium',
  templateUrl: './car-premium.component.html',
  styleUrls: ['./car-premium.component.css'],
  providers: []
})
export class CarPremiumComponent implements OnInit, OnDestroy {

  //premium_list:{ins_img:string, ins_plan:string, idv_amt:number, addon_cover:string, premium_amt:number}[] = [];
  //isChecked = false;
  panelOpenState = false;
  isChecked = [];
  colXs = window.matchMedia("(max-width: 767px)");
  checkvalue = [];
  comparePremiumList = [];
  tempComparePremiumList = [];
  premiumResult = [];
  finalResult = [];
  insurerCode;
  premiumInsurerCode;
  addonList = [];
  discountList = [];
  additionalList = [];
  selectedCoverList = [];
  subModelList;
  premiumBreakUpList: any = {};
  userSelectedCarDetails: carQuoteRequest = {} as carQuoteRequest;
  constructor(public dialog: MatDialog, public router: Router,
    public localStorageService: LocalStorageService,
    public commonService:CommonService,
    public premium: CarPremiumService,
    public activatedroute: ActivatedRoute) {
  }
  parentUrl: UrlSegment[];

  @Output() breakUpEvent = new EventEmitter();

  ngOnInit() {
    this.finalResult = [];
    //removing user selected cover while page refresh
    this.userSelectedCarDetails = this.localStorageService.getItem("carQuoteRequest");
    this.userSelectedCarDetails.CoverDetails = [];
    this.localStorageService.setItem("carQuoteRequest", this.userSelectedCarDetails);
    this.premium.callPrefferedInsurer(this.userSelectedCarDetails);
    this.localStorageService.setItem("recalculatePressed", false);
    if (this.colXs.matches) { // If media query matches
      this.tempComparePremiumList = [1, 2];
    } else {
      this.tempComparePremiumList = [1, 2, 3];
    }
    this.callCoverageDataList(constant);
    this.premium.getFinalPremium((response) => {
      this.finalResult = response;
    });
    this.premium.getDieselFromSubModelList(this.userSelectedCarDetails, (fuelType) => {
      this.userSelectedCarDetails.VehicleDetails.fuelType = fuelType;
    });
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {

  }

  getCoverSelection(coverObject, index) {
    console.log(coverObject);

    this.premium.getCoverSelection(coverObject, index, (data) => {

    });
  }


  RecalculatePremium() {
    this.finalResult = [];
    this.premium.calculateRecalculation();
    this.premium.testDataResult.subscribe((data) => {
      this.finalResult = data;
    });
  }

  callCoverageDataList(constant) {
    //if (this.localStorageService.getItem("addon") === null) {
    this.premium.getCoverageList(constant.carProductCode, (addon, discount, additional) => {
      this.addonList = addon;
      this.localStorageService.setItem("addon", this.addonList);
      this.discountList = discount;
      this.localStorageService.setItem("discount", this.discountList);
      this.additionalList = additional;
      this.localStorageService.setItem("additional", this.additionalList);
    });
    // }
    // else {
    //   this.addonList = this.localStorageService.getItem("addon");
    //   this.discountList = this.localStorageService.getItem("discount");
    //   this.additionalList = this.localStorageService.getItem("additional");
    // }
  }


  // OnClick Edit IDV Icon
  editIDVDlg(actualIdv, insurer): void {

    const dialogRef = this.dialog.open(CarPremiumIdvDialog, {
      width: '250px',
      data: {
        idv_amt: actualIdv,
        insurer: insurer
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.idv_amt = result;
    });
  }

  // OnClick Premium BreakUp
  premiumBreakUp(insurer): void {
    console.log("insurer data" + JSON.stringify(insurer));
    let premiumBreakData = this.showPremiumBreakUP(insurer);
    const dialogRef: any = this.dialog.open(CarPremiumBreakupDialog, {
      width: '500px',
      panelClass: 'myClass',
      data: { premiumBreakData },
    }, );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  showPremiumBreakUP(insurer) {
    this.premiumBreakUpList = {};
    this.premiumBreakUpList.basicOdPremium = insurer.coverDetails['OD'].premium;
    this.premiumBreakUpList.ThirdPartyPremium = insurer.coverDetails['TPL'].premium;
    this.premiumBreakUpList.ownDriverCoverPremium = insurer.coverDetails['CPA'].premium;
    this.premiumBreakUpList.actualIdv = insurer.actualIdv;
    this.premiumBreakUpList.grossPremium = insurer.grossPremium;
    this.premiumBreakUpList.imagePath = insurer.imagePath;
    //console.log("break up"+JSON.stringify(this.premiumBreakUpList));
    return this.premiumBreakUpList;
  }


  gotoCarCustomerDetails(insurer) {
  let quoteRequest=this.localStorageService.getItem("carQuoteRequest");  
  this.commonService.updateCoverageDetails(insurer.insurerCode,quoteRequest).subscribe(response=>{

  });
  this.premium.setSelectedInsurer(insurer);
    if (this.localStorageService.getItem("recalculatePressed")) {
      this.activatedroute.parent.url.subscribe((URL) => {
        this.parentUrl = URL;
      });
      this.router.navigateByUrl(this.parentUrl + "/" + 'customer-details');
    }
    else {
      this.premium.checkCoverSelectedOrNot((isAddtionalSelected, isAddonSelected, isDiscountSelected) => {
        if (isAddtionalSelected | isAddonSelected | isDiscountSelected) {

          const dialogRef = this.dialog.open(CarPremiumRecalcDialog, {
            width: '400px',
            panelClass: 'myClass',
            data: {}
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        }
        else {
          this.activatedroute.parent.url.subscribe((URL) => {
            this.parentUrl = URL;
          });
          this.router.navigateByUrl(this.parentUrl + "/" + 'customer-details');
        }
      });
    }
  }

  // // OnClick Add to Compare CheckBox

  // public addToCompare(insurerDetails, isChecked, index) {
  //   var result = false;
  //   if(isChecked)
  //   {
  //    if(this.comparePremiumList.length==0)
  //    {
  //     this.comparePremiumList.push(insurerDetails);
  //    }
  //    else{
  //       let count=0;
  //        this.comparePremiumList.map((data,objectindex)=>{

  //          if(objectindex==index)
  //          {
  //            count++;
  //           this.comparePremiumList.splice(index,1);
  //          }
  //        });
  //        if(count==0)
  //        {
  //         this.comparePremiumList.push(insurerDetails);
  //        }
  //        count=0;
  //     }
  //   }
  //   else{
  //     this.comparePremiumList.splice(index,1);
  //   }
  //   return result;
  // }



  public addToCompare(insurerDetails, isChecked, index) {
    var result = false;
    //isChecked = !isChecked;
    if (isChecked == true) {
      if (this.colXs.matches) { // If media query matches
        if (this.comparePremiumList.length >= 2) {
          alert("Maximum 2 insurance offers can be compared");
          result = false;
        } else {
          if (insurerDetails != null) {
            this.comparePremiumList.push(insurerDetails);
            this.tempComparePremiumList.splice(this.tempComparePremiumList.length - 1);
          }
          result = true;
        }
      } else {
        if (this.comparePremiumList.length >= 3) {
          alert("Maximum 3 insurance offers can be compared");
          result = false;
        } else {
          if (insurerDetails != null) {
            this.comparePremiumList.push(insurerDetails);
            this.tempComparePremiumList.splice(this.tempComparePremiumList.length - 1);
          }
          result = true;
        }
      }

    } else {
      for (let key of this.comparePremiumList) {
        if (key.id === insurerDetails.id) {
          var idx = this.comparePremiumList.indexOf(key); // 1
          // be careful, .indexOf() will return -1 if the item is not found
          if (idx !== -1) {
            this.comparePremiumList.splice(idx, 1);
            this.tempComparePremiumList.push(this.tempComparePremiumList.length + 1);
          }
        }
      }
      result = false;
    }

    return result;
  }







  // Open Compare Premium Insurer List
  openCompare(): void {
    const dialogRef = this.dialog.open(CarPremiumCompareInsurerDialog, {
      width: '700px',
      panelClass: 'myClass',
      data: { comparePremiumList: this.comparePremiumList }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  public removePlainCompareList(insurerObject, objectIndex) {
    this.comparePremiumList.map((data, index) => {
      if (index == objectIndex) {
        this.checkvalue[index] = false;
        this.comparePremiumList.splice(index, 1);
      }
    });

  }


  //Remove All Plan Compare List

  public removeAllCompareList() {
    this.comparePremiumList = [];
    if (this.colXs.matches) { // If media query matches
      this.tempComparePremiumList = [1, 2];
    } else {
      this.tempComparePremiumList = [1, 2, 3];
    }
    this.checkvalue = [];
  }

  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
}



// Modify IDV Dialog

@Component({
  selector: 'car-premium-idv-dialog',
  templateUrl: 'car-premium-idv-dialog.html'
})
export class CarPremiumIdvDialog {

  constructor(
    public dialogRef: MatDialogRef<CarPremiumIdvDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, public premium: CarPremiumService) {
    //super(dialog,router,localStorageService,premium,activatedroute);
    console.log("loading idv dialog");
  }

  idvYes(): void {
    console.log("yes block");
    let imagePath;

    this.premium.getFinalPremium((data) => {
      console.log("this insurer details" + JSON.stringify(this.data.insurer));
      this.premium.calculateSingleInsurerCalcForIdvChanges(this.data.idv_amt, this.data.insurer, (response) => {
        data.map((value, index) => {
          Object.keys(response.premium).map(key => {
            if (value.insurerCode == key) {
              imagePath = value.imagePath;
              let resultdata = response.premium[key];
              resultdata.imagePath = imagePath;
              data.splice(index, 1);
              data.push(resultdata);
              this.premium.updateTestDataArrayList(data);
            }
          });
        });
      });

    });


    this.dialogRef.close();
  }

  idvNo(): void {
    // just close the idv dialog
    this.dialogRef.close();
  }



}

// Premium Breakup Dialog

@Component({
  selector: 'car-premium-breakup-dialog',
  templateUrl: 'car-premium-breakup-dialog.html'
})

export class CarPremiumBreakupDialog {

  premiumBreakUpDataList: any = {};
  constructor(
    public dialog: MatDialog, public router: Router,
    public localStorageService: LocalStorageService,
    public premium: CarPremiumService,
    public activatedroute: ActivatedRoute,
    public dialogRef: MatDialogRef<CarPremiumBreakupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.premiumBreakUpDataList = data;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

// Car Compare Premium Insurer Dialog

@Component({
  selector: 'car-premium-compare-insurer-dialog',
  templateUrl: 'car-premium-compare-insurer-dialog.html'
})

export class CarPremiumCompareInsurerDialog {

  comparePremiumBuyList: any = [];

  constructor(
    public dialogRef: MatDialogRef<CarPremiumCompareInsurerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router, public activatedroute: ActivatedRoute) {
    this.comparePremiumBuyList = data.comparePremiumList;
  }
  parentUrl: UrlSegment[];

  onNoClick(): void {
    this.dialogRef.close();
  }

  gotoCarCustomerDet() {
    console.log("activated route car " + this.activatedroute);
    this.activatedroute.parent.url.subscribe((URL) => {
      this.parentUrl = URL;
    });
    this.router.navigateByUrl(this.parentUrl + "/" + 'customer-details');
  }
}
// Premium Re Calculation Dialog

@Component({
  selector: 'car-premium-recalc-dialog',
  templateUrl: 'car-premium-recalc-dialog.html',
})

export class CarPremiumRecalcDialog {

  parentUrl;
  constructor(
    public dialogRef: MatDialogRef<CarPremiumRecalcDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public premium: CarPremiumService) {
    console.log("premium recalc dialog");
  }

  proceedRecalculate() {
    this.premium.calculateRecalculation();
    this.dialogRef.close();
  }

  proceedNo(event) {
    this.dialogRef.close();
  }

  onNoClick(): void {
    console.log("cover change selected");

    this.dialogRef.close();
  }
}


