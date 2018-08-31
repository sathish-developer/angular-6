import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSidenav } from '@angular/material';
import { Router, UrlSegment, ActivatedRoute } from '@angular/router';


export interface DialogData {
  idv_amt: number;
}

@Component({
  selector: 'twoWheeler-premium',
  templateUrl: './twoWheeler-premium.component.html',
  styleUrls: ['./twoWheeler-premium.component.css']
})
export class TwoWheelerPremiumComponent implements OnInit {

  //premium_list:{ins_img:string, ins_plan:string, idv_amt:number, addon_cover:string, premium_amt:number}[] = [];
  //isChecked = false;
  panelOpenState = false;
  colXs = window.matchMedia("(max-width: 767px)");
  checkvalue = [];
  comparePremiumList = [];
  tempComparePremiumList = [];


  premium_list = [{
    id: 1,
    ins_img: '../../assets/images/Aditya.png',
    ins_plan: 'ACTIV ASSURE - DIAMOND WITH SUPER NCB',
    idv_amt: '7,800',
    addon_cover: [
      {
        rsa: 'Road Side Assistance',
        zd: 'Zero Depreciation'
      }],
    premium_amt: '15,000.00'
  }, {
    id: 2,
    ins_img: '../../assets/images/Kotak.png',
    ins_plan: 'LIFELINE SUPREME',
    idv_amt: '9,600',
    addon_cover: [
      {
        rsa: 'Road Side Assistance',
        zd: 'Zero Depreciation'
      }],
    premium_amt: '27,000.00'
  }, {
    id: 3,
    ins_img: '../../assets/images/Religare.png',
    ins_plan: 'GO ACTIVE',
    idv_amt: '12,000',
    addon_cover: [
      {
        rsa: 'Road Side Assistance',
        zd: 'Zero Depreciation'
      }],
    premium_amt: '39,000.00'
  }, {
    id: 4,
    ins_img: '../../assets/images/Star.png',
    ins_plan: 'OPTIMA RESTORE',
    idv_amt: '18,000',
    addon_cover: [
      {
        rsa: 'Road Side Assistance',
        zd: 'Zero Depreciation'
      }],
    premium_amt: '36,000.00'
  }, {
    id: 5,
    ins_img: '../../assets/images/Cigna.png',
    ins_plan: 'PROHEALTH PLUS SB02',
    idv_amt: '18,000',
    addon_cover: [
      {
        rsa: 'Road Side Assistance',
        zd: 'Zero Depreciation'
      }],
    premium_amt: '36,000.00'
  }];
  constructor(public dialog: MatDialog, public router: Router, public activatedroute: ActivatedRoute) { }
  parentUrl: UrlSegment[];

  ngOnInit() {
    if (this.colXs.matches) { // If media query matches
      this.tempComparePremiumList = [1, 2];
    } else {
      this.tempComparePremiumList = [1, 2, 3];
    }
    window.scrollTo(0, 0);
  }

  idv_amt = 1000;

  // OnClick Edit IDV Icon
  editIDVDlg(): void {
    const dialogRef = this.dialog.open(TwoWheelerPremiumIdvDialog, {
      width: '250px',
      data: { idv_amt: this.idv_amt }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.idv_amt = result;
    });
  }

  // OnClick Premium BreakUp
  premiumBreakUp(): void {
    const dialogRef = this.dialog.open(TwoWheelerPremiumBreakupDialog, {
      width: '500px',
      panelClass: 'myClass',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  gotoCarCustomerDet() {
    this.activatedroute.parent.url.subscribe((URL) => {
      this.parentUrl = URL;
    });
    this.router.navigateByUrl(this.parentUrl + "/" + 'customer-details');
  }

  // OnClick Add to Compare CheckBox

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
    const dialogRef = this.dialog.open(TwoWheelerPremiumCompareInsurerDialog, {
      width: '700px',
      panelClass: 'myClass',
      data: { comparePremiumList: this.comparePremiumList }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  // Remove Plan From Compare List

  public removePlanFromCompareList(plan) {
    var index = undefined;
    var ins_plan = undefined;

    for (var i = 0; i < this.comparePremiumList.length; i++) {
      if (this.comparePremiumList[i].ins_plan === plan.ins_plan) {
        index = i;
        ins_plan = plan.ins_plan;
        break;
      }
    }

    if (index != undefined && ins_plan != undefined) {
      this.tempComparePremiumList.push(this.tempComparePremiumList.length + 1)
      this.comparePremiumList.splice(index, 1);
      for (var i = 0; i < this.premium_list.length; i++) {
        if (this.premium_list[i].ins_plan === ins_plan) {
          this.checkvalue[i] = false;
          break;
        }
      }
    }
  }

  // Remove All Plan Compare List

  public removeAllCompareList() {
    this.comparePremiumList = [];
    if (this.colXs.matches) { // If media query matches
      this.tempComparePremiumList = [1, 2];
    } else {
      this.tempComparePremiumList = [1, 2, 3];
    }

    for (var i = 0; i < this.premium_list.length; i++) {
      this.checkvalue[i] = false;
    }
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
  selector: 'twoWheeler-premium-idv-dialog',
  templateUrl: 'twoWheeler-premium-idv-dialog.html'
})
export class TwoWheelerPremiumIdvDialog {

  constructor(
    public dialogRef: MatDialogRef<TwoWheelerPremiumIdvDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// Premium Breakup Dialog

@Component({
  selector: 'twoWheeler-premium-breakup-dialog',
  templateUrl: 'twoWheeler-premium-breakup-dialog.html'
})

export class TwoWheelerPremiumBreakupDialog {
  constructor(
    public dialogRef: MatDialogRef<TwoWheelerPremiumBreakupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// Car Compare Premium Insurer Dialog

@Component({
  selector: 'twoWheeler-premium-compare-insurer-dialog',
  templateUrl: 'twoWheeler-premium-compare-insurer-dialog.html'
})

export class TwoWheelerPremiumCompareInsurerDialog {
  constructor(
    public dialogRef: MatDialogRef<TwoWheelerPremiumCompareInsurerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public router: Router, public activatedroute: ActivatedRoute) { }
    parentUrl: UrlSegment[];

  onNoClick(): void {
    this.dialogRef.close();
  }

  gotoCarCustomerDet() {
    this.activatedroute.parent.url.subscribe((URL) => {
      this.parentUrl = URL;
    });
    this.router.navigateByUrl(this.parentUrl + "/" + 'customer-details');
  }
}


