import { Injectable } from "@angular/core";
import { select } from "../car-models/car.dropdown.model";
@Injectable()
export class CarDropDownService {


    registeredNames: select[] = [{ value: 'Individual-0', viewValue: 'INDIVIDUAL' }, { value: 'Company-1', viewValue: 'COMPANY' }];
    manufacturings: select[] = [{ value: '2010', viewValue: '2010' }, { value: '2011', viewValue: '2011' },
    { value: '2012', viewValue: '2012' }, { value: '2013', viewValue: '2013' },
    { value: '2014', viewValue: '2014' }, { value: '2015', viewValue: '2015' },
    { value: '2016', viewValue: '2016' }, { value: '2017', viewValue: '2017' },
    { value: '2018', viewValue: '2018' }];
    previousPolicys: select[] = [{ value: 'Comprehensive-0', viewValue: 'Comprehensive' }, { value: 'ThirdParty-0', viewValue: 'ThirdParty' }];




    constructor() { }


    getRegistredNames(callback) {
        callback(this.registeredNames);
    }

    getManufacturings(callback) {
        callback(this.manufacturings);
    }

    getPreviousPolicys(callback) {
        callback(this.previousPolicys);
    }
}