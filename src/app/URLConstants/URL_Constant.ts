
export class URLCONSTANT{
    public static PORT='8080';

    public static ROOT_CONTEXT_NAME="masters/api/";

    public static POT_CONTEXT_NAME="POTUILOCAL/"

    public static HOST="http://192.168.0.152:";

    public static ROOT_URL=URLCONSTANT.HOST+URLCONSTANT.PORT+'/'+URLCONSTANT.ROOT_CONTEXT_NAME;
   
    public static MIS_URL=URLCONSTANT.HOST+URLCONSTANT.PORT+"/mis_local/api/";

    public static GET_MODEL_BY_MAKE_VEHICLE_TYPE="getModelByMakeAndVehicleType.json";

    public static SINGLE_INSURER_CALC="singleInsurerCalc.json";

    public static GET_PREFFERED_INSURER="getPreferredInsurer.json";

    public static COVERAGES="getCoveragesByProduct.json";

    public static GET_BUNDLE_LIST_URL=URLCONSTANT.HOST+URLCONSTANT.PORT+"/POTUILOCAL/getListOfBundle.json";

    public static TEST="test";

    public static GET_MODEL_BY_MAKE_VEHICLE_CATEGORY="getVehicleDetailsByVehicleCategory.json";

    public static GET_MODEL_BY_MAKE_VEHICLE_TYPE_URL=URLCONSTANT.ROOT_URL+URLCONSTANT.GET_MODEL_BY_MAKE_VEHICLE_TYPE;

    public static GET_MODEL_BY_MAKE_VEHICLE_CATEGORY_URL=URLCONSTANT.ROOT_URL+URLCONSTANT.GET_MODEL_BY_MAKE_VEHICLE_CATEGORY;

    public static SINGLE_INSURER_CALC_URL=URLCONSTANT.MIS_URL+URLCONSTANT.SINGLE_INSURER_CALC;

    public static GET_PREFFERED_INSURER_URL=URLCONSTANT.ROOT_URL+URLCONSTANT.GET_PREFFERED_INSURER;

    public static GET_COVERAGES_URL=URLCONSTANT.ROOT_URL+URLCONSTANT.COVERAGES;

    public static TEST_URL="http://localhost:8080/masters/api/getCoveragesByProduct.json";

    public static GET_INSURER_DETAILS="getInsurerDetail.json";

    public static GET_RTO_AND_ZONE="getRtoAndZoneByRtoNo.json";

    public static INTEGRATION_PAYMENT="paymentRequest/"

    public static SAVE_QUOTE="saveQuoteDetails.json";

    public static UPDATE_COVER_DETAILS="updateCoverageDetailsInQuote.json";

    public static UPDATE_UPTO_NOMINEE="updateUptoNominee.json";

    public static UPDATE_ALL_ENRICHMENT="updateAllEnrichment.json";

    public static GET_CITY_AND_STATE="getCityAndState.json";

    public static GET_NOMINEE_RELATIONSHIP="getRelationship.json";

    public static GET_FINANCIER="getFinanciers..json";

    public static GET_INSURER_DETAILS_URL=URLCONSTANT.HOST+URLCONSTANT.PORT+'/'+URLCONSTANT.ROOT_CONTEXT_NAME+URLCONSTANT.GET_INSURER_DETAILS;

    public static GET_RTO_AND_ZONE_URL=URLCONSTANT.HOST+URLCONSTANT.PORT+'/'+URLCONSTANT.ROOT_CONTEXT_NAME+URLCONSTANT.GET_RTO_AND_ZONE;

    public static INTEGRATION_PAYMENT_URL=URLCONSTANT.HOST+URLCONSTANT.PORT+'/'+URLCONSTANT.POT_CONTEXT_NAME+"paymentRequest/"

    public static SAVE_QUOTE_URL=URLCONSTANT.MIS_URL+URLCONSTANT.SAVE_QUOTE;

    public static UPDATE_COVER_DETAILS_URL=URLCONSTANT.MIS_URL+URLCONSTANT.UPDATE_UPTO_NOMINEE;

    public static UPDATE_ALL_ENRICHMENT_URL=URLCONSTANT.MIS_URL+URLCONSTANT.UPDATE_ALL_ENRICHMENT;

    public static GET_CITY_AND_STATE_URL=URLCONSTANT.ROOT_URL+URLCONSTANT.GET_CITY_AND_STATE;

    public static GET_NOMINEE_RELATIONSHIP_URL=URLCONSTANT.ROOT_URL+URLCONSTANT.GET_NOMINEE_RELATIONSHIP;

    public static GET_FINANCIER_URL=URLCONSTANT.ROOT_URL+URLCONSTANT.GET_FINANCIER;
   
}