import { carQuoteRequest } from './../mainmodules/motors/Car/car-models/car.quote.request.model';
import { LocalStorageService } from './common.storage.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLCONSTANT } from "../URLConstants/URL_Constant";
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { share } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { callbackify } from 'util';

/**
 * @author sathish kumar
 * 
 */
@Injectable({
    providedIn: 'root',
})
export class CommonService {

    counter = 0;
    productCode;
    makeModelArray = [];
    bundleList = [];
    subModelArrayList;
    tempArrayList;

    allMakeModel;
    test = "pcc";
    allSubmodel;
    constructor(private http: HttpClient,
        private storage: LocalStorageService,
        public datepipe: DatePipe) {
        if (this.storage.getItem('allmake') === null) {
            this.allMakeModel = this.getAllMake();
            this.allMakeModel.subscribe((response) => {
                this.storage.setItem("allmake", response);
                this.allMakeModel = response;
            });
        }
        else {
            this.allMakeModel = this.storage.getItem("allmake");
        }

    }



    /**
     * 
     * this service is used to get all make models for all the vehicles
     * 
     * * */
    getAllMake() {
        return this.http.post(URLCONSTANT.GET_MODEL_BY_MAKE_VEHICLE_TYPE_URL, '');
    }



    /**
     * 
     * this method is used to save the quote details
     * 
     * * */

    saveQuoteDetails(QuoteRequest: carQuoteRequest) {
        return this.http.post(URLCONSTANT.SAVE_QUOTE_URL, QuoteRequest);
    }


    /**
     * 
     * this method is used to update the coverageDetails
     * 
     * * */
    updateCoverageDetails(insurerCode, quoteRequest) {
        return this.http.post(URLCONSTANT.UPDATE_COVER_DETAILS_URL + insurerCode, quoteRequest);
    }


    /**
     * 
     * this method is used to update the uptp nominee details
     * 
     * * */

    updateUptoNomineeDetails(quoteRequest) {
        return this.http.post(URLCONSTANT.UPDATE_COVER_DETAILS_URL, quoteRequest);
    }


    getNomineeRelatioshipDetails(callback) {
        if (this.storage.getItem("nomineeRelationship") === null) {
            this.http.post(URLCONSTANT.GET_NOMINEE_RELATIONSHIP_URL, '').subscribe(response => {
                this.storage.setItem("nomineeRelationship", response);
                return callback(this.storage.getItem("nomineeRelationship"));
            });
        }
        else {
            return callback(this.storage.getItem("nomineeRelationship"));
        }
    }


    getFinancierDetails(callback){
        if (this.storage.getItem("financier") === null) {
            this.http.post(URLCONSTANT.GET_FINANCIER_URL, '').subscribe(response => {
                this.storage.setItem("financier", response);
                return callback(this.storage.getItem("financier"));
            });
        }
        else {
            return callback(this.storage.getItem("financier"));
        }
    }


    /**
     * 
     * this method is used to update all enrichment Details
     * 
     * * */

    updateAllEnrichmentDetails(quoteRequest) {
        return this.http.post(URLCONSTANT.UPDATE_ALL_ENRICHMENT_URL, quoteRequest);
    }


    /**
     * 
     * this method is used to get all submodel by subline code
     * 
     ***/

    getAllSubModel(sublineCode) {
        return this.http.post(URLCONSTANT.GET_MODEL_BY_MAKE_VEHICLE_CATEGORY_URL + "?sublineCode=" + sublineCode, '');
    }

    /**
     * 
     * this method is used to get all rto and Zone data
     * 
     ***/

    getRtoAndZone() {
        return this.http.post(URLCONSTANT.GET_RTO_AND_ZONE_URL, '');
    }




    getCityAndStateData(callback) {
        if (this.storage.getItem("cityandstate") === null) {
            this.http.post(URLCONSTANT.GET_CITY_AND_STATE_URL, '').subscribe(response => {
                this.storage.setItem("cityandstate", response);
                return callback(this.storage.getItem("cityandstate"));
            });
        }
        else {
            return callback(this.storage.getItem("cityandstate"));
        }
    }


    /**
     * 
     * this method is used to get all rto and Zone data
     * 
     **/
    getRtoAndZoneData(callback) {
        if (this.storage.getItem("rtoAndZone") === null) {
            this.getRtoAndZone().subscribe((data) => {
                this.storage.setItem("rtoAndZone", data);
                return callback(this.storage.getItem("rtoAndZone"));
            });
        }
        else {
            return callback(this.storage.getItem("rtoAndZone"));
        }
    }

    /**
     * 
     * this method is filter rto and zone by sublineCode
     * 
     **/
    filterRtoAndZoneBySublineCode(sublineCode, rto, callback) {
        var result = [];
        this.getRtoAndZoneData((data) => {
            let rtoList = data.rtoZoneMap;
            for (let key in rtoList) {
                if (key === 'PC') {
                    let rtoObjectList = rtoList[key];
                    for (let x in rtoObjectList) {
                        if (x == 'MH01') {
                            result.push(rtoObjectList[x]);
                        }
                    }
                }
            }
            return callback(result);
        });
    }




    /*
     * 
     *  this method is get previous insurerList dropdown
     *  
     */
    getPreviousInsurer(callback?) {
        this.http.post(URLCONSTANT.GET_INSURER_DETAILS_URL, '').subscribe((data) => {
            return callback(this.filterPreviousInsurerDetails(data));
        });
    }


    /*
     * 
     *  this method is just to create a mock observable to all subscribers
     *  
     */
    createObservable(data: any): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            observer.next(data);
            observer.complete();
        });
    }

    /**
     * 
     * this method is used to filter all make model list by productCode
     * 
     * ***/
    getAllMakeAndModelListByProductCode(productCode) {
        var array = this.allMakeModel.makeModelMap;
        for (let key in array) {
            var pc = array[key];
            Object.keys(pc).map(x => {
                if (x == productCode) {
                    var finalArray = pc[productCode];
                    for (let index = 0; index < finalArray.length; index++) {
                        var make_N_model = finalArray[index].makeName + "," + finalArray[index].name;
                        finalArray[index].makeAndName = make_N_model;
                        this.makeModelArray.push(finalArray[index]);
                    }
                }
            });
        }
        return this.makeModelArray;
    }


    /*
    * this method is used to get all submodelList subline code
    */
    getAllSubmodelBySubLineCode(sublineCode, callback) {
        if (this.storage.getItem("allSubModel") === null) {
            this.getAllSubModel(sublineCode).subscribe((response) => {
                this.storage.setItem("allSubModel", response);
                return callback(response);
            });
        }
        else {
            return callback(this.storage.getItem("allSubModel"));
        }
    }


    /*
     * 
     *  this method is used to convertDatetoString format
     *  
     */
    public convertDateToStringFormat(date): string {
        return this.datepipe.transform(date, "dd/MM/yyyy");
    }


    /*
     * 
     *  this method filter the insurerList data for dropdown
     *  
     */
    filterPreviousInsurerDetails(insurerDetailsList) {
        let resultList = [];
        let insurerList = insurerDetailsList.insurerList;
        for (let i = 0; i < insurerList.length; i++) {
            resultList.push(insurerList[i].insurerName);
        }
        return insurerList;
    }



    /**
  * this method is used to call prefered insurer
  * **/
    getPrefferedInsurer(prefferedInsurerRequest, callback?) {
        if (this.storage.getItem("prefferedInsurerList") === null) {
            this.http.post(URLCONSTANT.GET_PREFFERED_INSURER_URL, prefferedInsurerRequest).subscribe((data: any) => {
                this.storage.setItem("prefferedInsurerList", data.preferredInsurers);
                return callback(data.preferredInsurers);
            });
        }
        else {
            return callback(this.storage.getItem("prefferedInsurerList"));
        }
    }

    /**
        * this method is used to get Bundle list data
        * **/
    getBundleDetailsData(callback?) {
        if (this.storage.getItem("bundleLIst") === null) {
            this.http.post(URLCONSTANT.GET_BUNDLE_LIST_URL, '').subscribe((response: any) => {
                this.bundleList = response;
                this.storage.setItem("bundleLIst", response);
                return callback(response);
            });
        }
        else {
            return callback(this.storage.getItem("bundleLIst"));
        }

    }

}