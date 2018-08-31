import { coverConstant,commonStatus} from './../../../../commonservices/common.constant.service';
import { CoverDetails, InsurerDetail, carQuoteRequest } from './../car-models/car.quote.request.model';
import { PrefferedInsurerRequest } from '../car-models/car.prefferedInsurer.request.model';
import { LocalStorageService } from '../../../../commonservices/common.storage.service';
import { CommonService } from '../../../../commonservices/common.service';
import { URLCONSTANT } from '../../../../URLConstants/URL_Constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CarPrefferedInsurerResponse } from '../car-models/car.prefferedInsurer.response.model';
import { BehaviorSubject } from 'rxjs';


/**
 * 
 * @author sathish kumar
 * 
 * **/

@Injectable()
export class CarPremiumService {
  result = [];
  finalResult = [];
  premiumResult = [];

  fuelType="";
  selectedInsurer={};
  testDataResult = new BehaviorSubject<any[]>(this.finalResult);
  testsubscribe = this.testDataResult.asObservable();

  additionalcoverlist = [];
  addoncoverlist = [];
  discountcoverlist = [];
  prefferedInsurerList = [];
  PrefferedInsurerRequest: Array<PrefferedInsurerRequest> = [];

  bundleList = [];
  constructor(private http: HttpClient,
    private common: CommonService, private storage: LocalStorageService) {
      console.log("car premium service injected");
  }



  /**
 * this method is used to call preferred insurer list as well as it would call single insurer by page refresh
 * **/
  callPrefferedInsurer(quoteRequest) {
    this.finalResult = [];
    let prefferedInsurerRequest = this.storage.getItem("prefferedInsurerRequest");
    this.common.getPrefferedInsurer(prefferedInsurerRequest, (prefferedInsurerResponse) => {
      this.filterPremium(quoteRequest, prefferedInsurerResponse, (data) => {
      });
    });
  }




  /**
  * this method is used to get SingleInsurer calculation data
  * **/
  getSingleInsurerCalcData(data) {
    return this.http.post(URLCONSTANT.SINGLE_INSURER_CALC_URL, data).toPromise();
  }

  /**
   * this method is used to get all coverDetails
   * **/
  getCoverageData() {
    return this.http.post(URLCONSTANT.GET_COVERAGES_URL, '');
  }


  /**
  * this method is used to call the coverage list by product code
  * this is general for all vehicle product
  * 
  * **/
  getCoverageList(productCode, callback?) {
    this.getCoverageData().subscribe((coverages) => {
      this.filterCoverageListByProductCode(coverages, productCode, (addon, discount, additional) => {
        return callback(addon, discount, additional);
      });
    });
  }


  /**
   * this method is used to filter the coverage list by product code
   * this is general for all vehicle product
   * 
   * **/
  filterCoverageListByProductCode(coverageData, productCode, callback?) {
    let addonList = [];
    let discountList = [];
    let additionalList = [];
    let coverageObjectList = [];
    let coverages = coverageData.coverageList;
    for (let key in coverages) {
      if (key == productCode) {
        coverageObjectList = coverages[productCode];
        for (let j = 0; j < coverageObjectList.length; j++) {
          let CoverageObject = coverageObjectList[j];
          if (CoverageObject.coverType == 'ADDON') {
            addonList.push(CoverageObject);
          }
          if (CoverageObject.coverType == 'DISCOUNTS') {
            discountList.push(CoverageObject);
          }
          if (CoverageObject.coverType == 'ADDITIONAL') {
            additionalList.push(CoverageObject);
          }
        }
      }
    }
    return callback(addonList, discountList, additionalList);
  }

  /**
   * this method is used to filter generate request for 
   * single insurer calculation based on preffered insurer list(that is already taken)
   * **/

  filterPremium(quoteRequest, prefferedInsurerList, callback?) {
    let prefferedInsurer = prefferedInsurerList;
    for (let i = 0; i < prefferedInsurer.length; i++) {
      let preferredInsurer: CarPrefferedInsurerResponse = prefferedInsurer[i];
      this.getBundleDetailsList(quoteRequest, preferredInsurer, 'PCC', 'N', (bundleResponse) => {
        let promise = new Promise((resolve, reject) => {
          resolve(this.getSingleInsurerCalcData(bundleResponse));
        }).then((response) => {
          this.assignPremium(prefferedInsurerList, response, (data) => {
            this.premiumResult = [];
            this.premiumResult = data;
            return callback(this.premiumResult);
          });
        }).catch((error) => {
          console.log(error);
          //reject(error);
        });
      });
    }
    //debugger;
    // return callback(this.premiumResult);
  }


  /**
 * this method is used assign the filtered premium to the array list for 
 * to render in user view
 * **/
  assignPremium(prefferedInsurerList, response, callback?) {
    //this.finalResult=[];
    if (response != null) {
      let insurerList = prefferedInsurerList;
      let premium = response.premium;
      //let premiumInsurerCode = {} as any;
      let insurerCode = '0' as string;
      for (let i = 0; i < insurerList.length; i++) {
        insurerCode = insurerList[i].insurerCode;
        for (let key in premium) {
          if (key == insurerCode) {
            if (premium[key].status == 'SUCCESS') {
              this.result = premium[key];
              this.result["imagePath"] = insurerList[i].imagePath;
              this.finalResult.push(this.result);
            }
          }
        }
      }
    }
    return callback(this.finalResult);
  }


  /**
   * this method is used to simply return the final result arraylist which has the value
   * **/
  getFinalPremium(callback?) {
    return callback(this.finalResult);
  }


  /**
    * this method is used to extract fueltype from submodellist 
    * **/
  getDieselFromSubModelList(userSelectedCarDetails, callback?) {
    let submodelList = this.storage.getItem("allSubModel");
    for (let i = 0; i < submodelList.vehicleDetailsBySublineCode.length; i++) {
      if (userSelectedCarDetails.VehicleDetails.makeName == submodelList.vehicleDetailsBySublineCode[i].makeName.split(',')[0]) {
        this.fuelType = submodelList.vehicleDetailsBySublineCode[i].fuelType;
        this.storage.setItem("fuelType",this.fuelType);
      }
    }
    return callback(this.fuelType);
  }


  /**
 * this method is used to call the recalculation for single insurer calculation
 * **/
  RecalculatePremium(callback?) {
    let result = [];
    let quoteRequest = JSON.parse(localStorage.getItem("carQuoteRequest"));
    this.PrefferedInsurerRequest = JSON.parse(localStorage.getItem("prefferedInsurerList"));
    this.filterPremium(quoteRequest, this.PrefferedInsurerRequest, (data) => {
      return callback(data);
    });
  }



  /**
   * this method is used to get all cover selection by the user
   * **/
  getCoverSelection(coverObject?, index?, callback?) {
    if (coverObject.coverType == 'ADDITIONAL') {
      if (coverObject.selected) {
        this.additionalcoverlist.push(coverObject);
      }
      else {
        this.additionalcoverlist.splice(index, 1);
      }
    }
    else if (coverObject.coverType == 'ADDON') {
      if (coverObject.selected) {
        this.addoncoverlist.push(coverObject);
      }
      else {
        this.addoncoverlist.splice(index, 1);
      }
    }
    else if (coverObject.coverType == 'DISCOUNT') {
      if (coverObject.selected) {
        this.discountcoverlist.push(coverObject);
      }
      else {
        this.discountcoverlist.splice(index, 1);
      }
    }
    return callback(this.additionalcoverlist, this.addoncoverlist, this.discountcoverlist);
  }


  /**
 * this method is used to get user selected covers
 * **/
  getAllSelectedCovers(callback) {
    return callback(this.additionalcoverlist, this.addoncoverlist, this.discountcoverlist);
  }

  /**
   * this method is used to check if cover selected or not by the user
   * **/
  checkCoverSelectedOrNot(callback?) {
    let isAddonSelected;
    let isAddtionalSelected;
    let isDiscountSelected;
    if (this.additionalcoverlist.length > 0) {
      isAddtionalSelected = true;
    }
    else {
      isAddtionalSelected = false;
    }
    if (this.addoncoverlist.length > 0) {
      isAddonSelected = true;
    }
    else {
      isAddonSelected = false;
    }
    if (this.discountcoverlist.length > 0) {
      isDiscountSelected = true;
    }
    else {
      isDiscountSelected = false;
    }
    return callback(isAddtionalSelected, isAddonSelected, isDiscountSelected);
  }

  /**
   * this method is used to get bundle list for reliance and tata insurer
   * **/
  getBundleDetailsList(request, preferredInsurer, productCode, checkDefault, callback?) {
    request.InsurerDetails = [];
    let filtereredBundle: any = {};
    const insurerDetailsObj = { "insurerCode": preferredInsurer.insurerCode, "insurerName": "", "idv": 0, "minIdv": 0, "maxIdv": 0, "originalIdv": 0, "planName": "" };
    if (insurerDetailsObj.insurerCode == '122' || insurerDetailsObj.insurerCode == '128') {
      this.common.getBundleDetailsData(bundleResponse => {
        if (bundleResponse[insurerDetailsObj.insurerCode]['PCC']) {
          let bundleInsurerList = bundleResponse[insurerDetailsObj.insurerCode]['PCC'];
          for (let i = 0; i < bundleInsurerList.length; i++) {
            let bundleInsurerObject = bundleInsurerList[i];
            if (request.CoverDetails.length == 0) {
              if (bundleInsurerObject.isDefault == 'Y') {
                insurerDetailsObj.planName = bundleInsurerObject.planName;
                request.InsurerDetails.push(insurerDetailsObj);
                return callback(request);
              }
            }
            else if(this.checkAdditionalCoverSelectedorNot(request.CoverDetails,coverConstant.addon)){
              let filterBundledCoverList = this.getBundleCoverDetailsCodes(request.CoverDetails, bundleInsurerList);
              filtereredBundle = this.getMinCountBundleObject(filterBundledCoverList);
              insurerDetailsObj.planName = filtereredBundle.planName;
              request.InsurerDetails.push(insurerDetailsObj);
              return callback(request);
            }
            else{
              if (bundleInsurerObject.isDefault == 'Y') {
                insurerDetailsObj.planName = bundleInsurerObject.planName;
                request.InsurerDetails.push(insurerDetailsObj);
                return callback(request);
              }
            }
          }
        }
      });
    }
    else {
      request.InsurerDetails.push(insurerDetailsObj);
      return callback(request);
    }
  }



   /**
   * this method is used to get bundle list for reliance and tata insurer
   * **/
  checkAdditionalCoverSelectedorNot(CoverDetails,constant){
    let additionalselected=false;
    CoverDetails.map((coverObject)=>{
      if(coverObject.coverType==constant){
        additionalselected=true;
      }
    });
    return additionalselected;
  }



  /*
 *  
 * this method is used to get Minimum CoverCount object from filter Bundle list
 */
  getMinCountBundleObject(filterBundledCoverList) {
    let minCoverCount = 1000;
    let filteredBundleObject = {};
    filterBundledCoverList.map((value, index) => {
      if (value.totalCovers < minCoverCount) {
        minCoverCount = value.totalCovers;
        filteredBundleObject = value;
      }
    });
    return filteredBundleObject;
  }

  /*
   *  
   * this method is used to filter cover object by user selected covers
   */
  getBundleCoverDetailsCodes(selectedCoverDetails, ListOfBundle) {
    let bundleList = [];
    for (let i = 0; i < selectedCoverDetails.length; i++) {
      for (let j = 0; j < ListOfBundle.length; j++) {
        ListOfBundle[j].coverDetails.map((coverCode) => {
          if (selectedCoverDetails[i].coverCode == coverCode) {
            bundleList.push(ListOfBundle[j]);
          }
        });
      }
    }
    return bundleList;
  }


  /*
   *  
   * this method is used to calculate specified single insurer calculation
   */
  calculateSingleInsurerCalcForIdvChanges(actualIdv, insurerObject, callback?) {
    let quoteRequestObject: carQuoteRequest = this.storage.getItem("carQuoteRequest");
    let prefferedInsurerList = this.storage.getItem("prefferedInsurerList");
    let prefferedInsurerObject = {};
    quoteRequestObject.InsurerDetails = [];
    for (let i = 0; i < prefferedInsurerList.length; i++) {
      if (insurerObject.insurerCode == prefferedInsurerList[i].insurerCode) {
        prefferedInsurerObject = prefferedInsurerList[i];
      }
    }
    this.getAllSelectedCovers((addon, additional, discount) => {
      if (addon.length > 0) {
        for (let i = 0; i < addon.length; i++) {
          quoteRequestObject.CoverDetails.push(addon[i]);
        }
      }
      if (additional.length > 0) {
        for (let i = 0; i < additional.length; i++) {
          quoteRequestObject.CoverDetails.push(additional[i]);
        }
      }
      if (discount.length > 0) {
        for (let i = 0; i < discount.length; i++) {
          quoteRequestObject.CoverDetails.push(discount[i]);
        }
      }
    });
    this.getBundleDetailsList(quoteRequestObject, prefferedInsurerObject, '', '', (quoteRequestResponse) => {
      let insurerDetailsList = quoteRequestResponse.InsurerDetails;
      insurerDetailsList.map((value, index) => {
        let InsurerDetailObject = value;
        InsurerDetailObject.insurerCode = insurerObject.insurerCode;
        InsurerDetailObject.idv = actualIdv;
        InsurerDetailObject.minIdv = insurerObject.minIdv;
        InsurerDetailObject.maxIdv = insurerObject.maxIdv;
        InsurerDetailObject.originalIdv = insurerObject.originalIdv;
        InsurerDetailObject.planName = InsurerDetailObject.planName;
      });
      this.getSingleInsurerCalcData(quoteRequestObject).then((response) => {
        return callback(response);
      });
    });
  }


  /**
   * this method is used to recalculate the single insurer 
   * **/
  calculateRecalculation() {
    this.finalResult = [];
    let carQuoteRequest: carQuoteRequest = {} as carQuoteRequest;
    carQuoteRequest = this.storage.getItem("carQuoteRequest");
    carQuoteRequest.CoverDetails = [];
    this.getAllSelectedCovers((addon, additional, discount) => {
      if (addon.length > 0) {
        for (let i = 0; i < addon.length; i++) {
          this.storage.setItem("isCovereSelected", true);
          carQuoteRequest.CoverDetails.push(addon[i]);
        }
      }
      if (additional.length > 0) {
        for (let i = 0; i < additional.length; i++) {
          this.storage.setItem("isCovereSelected", true);
          carQuoteRequest.CoverDetails.push(additional[i]);
        }
      }
      if (discount.length > 0) {
        for (let i = 0; i < discount.length; i++) {
          this.storage.setItem("isCovereSelected", true);
          carQuoteRequest.CoverDetails.push(discount[i]);
        }
      }
      carQuoteRequest.InsurerDetails = [];
      this.storage.setItem("carQuoteRequest", carQuoteRequest);
    });

    this.RecalculatePremium((data) => {
      this.testDataResult.next(data);
    });
    this.checkCoverSelectedOrNot((isAddtionalSelected, isAddonSelected, isDiscountSelected) => {
      if (isAddtionalSelected | isAddonSelected | isDiscountSelected) {
        this.storage.setItem("recalculatePressed", true);
      }
      else {
        this.storage.setItem("recalculatePressed", false);
      }
    });
  }

  /**
   * this is used to update the existing list of premium
   * **/
  updateTestDataArrayList(list: any[]) {
    this.testDataResult.next(list);
  }


  
   /**
   * this is used to set user selected insurer
   * **/
setSelectedInsurer(insurer){
  this.storage.setItem("selectedInsurer",insurer);
}

/**
   * this is used to get selected Insurer
   * **/
 getSelectedInsurer(){
  return this.storage.getItem("selectedInsurer");
 }

}