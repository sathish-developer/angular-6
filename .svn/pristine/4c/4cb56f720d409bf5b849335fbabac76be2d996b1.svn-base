import { CommonService } from '../../../../../commonservices/common.service';
import { twoWheelerroute } from '../../twoWheeler.routing';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
export interface select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-twoWheeler-registration',
  templateUrl: './twoWheeler-registration.component.html',
  styleUrls: ['./twoWheeler-registration.component.css']
})
export class TwoWheelerRegistrationComponent implements OnInit {
  registeredNames: select[] = [
    { value: 'Individual-0', viewValue: 'Individual' },
    { value: 'Companay-1', viewValue: 'Companay' }
  ];
  manufacturings: select[] = [
    { value: '2010', viewValue: '2010' },
    { value: '2011', viewValue: '2011' },
    { value: '2012', viewValue: '2012' },
    { value: '2013', viewValue: '2013' },
    { value: '2014', viewValue: '2014' },
    { value: '2015', viewValue: '2015' },
    { value: '2016', viewValue: '2016' },
    { value: '2017', viewValue: '2017' },
    { value: '2018', viewValue: '2018' }
  ];
  previousPolicys: select[] = [
    { value: 'Comprehensive-0', viewValue: 'Comprehensive' }
  ];
  previousInsuranceCompanys: select[] = [
    { value: 'Bajaj-0', viewValue: 'Bajaj' },
    { value: 'HDFC-1', viewValue: 'HDFC' },
    { value: 'ICICI-2', viewValue: 'ICICI' }
  ];
  selects: select[] = [
    { value: 'one-0', viewValue: 'One' },
    { value: 'two-1', viewValue: 'Two' },
    { value: 'three-2', viewValue: 'Three' },
    { value: 'four-3', viewValue: 'four' }
  ];



  makeModel = new FormControl();
  makeModeloptions: string[] = ['One',
    'Two',
    'Three',
    'Four'
  ];
  makeModelfiltered: Observable<string[]>;

  subModel = new FormControl();
  subModeloptions: string[] = ['1',
    '2',
    '3',
    '4'
  ];
  subModelfiltered: Observable<string[]>;
  formGroup: FormGroup;

  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup;

  parentUrl:UrlSegment[];

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private _formBuilder: FormBuilder, 
    public router: Router,public activatedroute:ActivatedRoute,
    public commonservice:CommonService
  ) { }


  ngOnInit() {

    //console.log("from twowheeler"+
    //this.commonservice.getAllMakeAndModelListByProductCode('PC'));
    //this.commonservice.getAllMakeAndModelListByProductCode('PC');
  
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([

        this._formBuilder.group({
          firstNameFormCtrl: ['', Validators.required],
          lastNameFormCtrl: ['', Validators.required],
        }),
        this._formBuilder.group({
          emailFormCtrl: ['', Validators.required]
        }),
      ])
    });
    window.scrollTo(0, 0);
  }

  onclickCarRegistration() {
    this.activatedroute.parent.url.subscribe((URL)=>{
        this.parentUrl=URL;
    });
    this.router.navigateByUrl(this.parentUrl+"/"+'premium');
  }
}
