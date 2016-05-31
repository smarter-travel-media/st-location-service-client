/**
 * @module location-service-client
 */
import ClientRequest from "./client-request";

/**
 * This request contains all of the methods needed to build a request for the
 * geo accommodation endpoint endpoint.
 * @class AccommodationsByGeoRequest
 * @extends ClientRequest
 * @constructor
 */
class AccommodationsByGeoRequest extends ClientRequest {

  /**
   * Sets the geo id to load accommodations for
   * @method withGeoId
   * @param {Number} geoId the ta id of a geoId
   * @required
   */
  withGeoId(geoId) {
    this.geoId = geoId;
    return this;
  }

  /**
   * Sets the page of results to load
   * @method withPage
   * @param {Number} pageNumber the page of results to load
   * @param {Number} pageSize the size of the page to load
   */
  withPage(pageNumber, pageSize) {
    this.page = {
      pageNumber,
      pageSize
    };
    return this;
  }

  /**
   * Sets amenities that the results must have
   * @method withAmenityIds
   * @param amenityIds {Array} the ids of amenities
   */
  withAmenityIds(amenityIds) {
    this.amenityIds = amenityIds;
    return this;
  }

  /**
   * Sets the subtypes the hotel must be one of
   * @method withSubTypeIds
   * @param subTypeIds {Array} array of subtypes to load hotels for
   */
  withSubTypeIds(subTypeIds) {
    this.subTypeIds = subTypeIds;
    return this;
  }

  /**
   * Sets accommmodation exclusions by id
   * @method withExcludedIds
   * @param ids {Array} accommodation ids to exclude from response
   * @required
   */
  withExcludedIds(ids) {
    this.excludedIds = ids;
    return this;
  }

  /**
   * Sets the star ratings to filter on
   * @method withStarRatings
   * @param starRatings {Array}  ex: [0, 10, 15]
   */
  withStarRatings(starRatings) {
    this.starRatings = starRatings;
    return this;
  }

  /**
   * Sets the price range to filter hotels by
   * @method withPriceRange
   * @param low {Number} minimum price to show
   * @param high {Number} max price to show
   * @param currencyCode {String} the currencyCode for the price range bounds
   */
  withPriceRange(low, high, currencyCode) {
    this.priceRange = {
      low,
      high,
      currencyCode
    };
    return this;
  }

  /**
   * Sets the sort for requested accommodations
   * @method withSort
   * @param name {String} the sort name
   * @param decending {Boolean} is the sort in decending order
   * @param algorithm {String} the revenue algorithm to use
   * @param countryCode {String} the 2 letter country code to apply the sort
   */
  withSort(name, decending, algorithm, countryCode) {
    this.sort = {
      name,
      decending,
      algorithm,
      countryCode
    };
    return this;
  }

  /**
   * @override
   */
  createRequest() {
    if (!this.geoId || !this.locale) {
      throw "Missing required data for accommodation by geo id request";
    }

    var requestUrl = `${encodeURIComponent(this.locale)}/ids/ta/${this.geoId}/accommodations`;
    var matrixVars = this.getMatrixVars();
    var matrixVarString = ";" + Object.keys(matrixVars).map(key => {
      return `${key}=${encodeURIComponent(matrixVars[key])}`;
    }).join(";");

    var queryParams = this.getQueryParms();
    var queryString = "?" + Object.keys(queryParams).map(key => {
      return `${key}=${encodeURIComponent(queryParams[key])}`;
    }).join("&");

    requestUrl += matrixVarString;
    requestUrl += queryString;
    return requestUrl;

  }

  getMatrixVars() {
    const vars = {};

    if (this.subTypeIds && this.subTypeIds.length) {
      vars.subtype = this.subTypeIds.join(",");
    }

    if (this.priceRange && this.priceRange.low !== "undefined" && this.priceRange.high !== "undefined" && this.priceRange.currencyCode) {
      vars.price = `${this.priceRange.low}-${this.priceRange.high}${this.priceRange.currencyCode}`;
    }

    if (this.excludedIds && this.excludedIds.length) {
      vars.exclude = this.excludedIds.join(",");
    }

    if (this.starRatings && this.starRatings.length) {
      vars.stars = this.starRatings.join(",");
    }

    return vars;
  }

  /**
   * Builds an object of query param name to value non encoded.
   * This handles compound, sort, and page
   * @method getQueryParms
   */
  getQueryParms() {
    const vars = {};

    if (typeof this.compound != "undefined") {
      vars.compound = this.compound ? 1 : 0;
    }

    if (this.sort && this.sort.name) {
      if (typeof this.sort.decending != "undefined") {
        vars.sort = this.sort.name + "+" + (this.sort.decending ? "desc" : "asc");
      } else {
        vars.sort = this.sort.name;
      }

      if (this.sort.countryCode) {
        vars.sortCountry = this.sort.countryCode;
      }

      if (this.sort.algorithm) {
        vars.revenueType = this.sort.algorithm;
      }
    }

    if (this.page && this.page.pageNumber) {
      vars.page = this.page.pageNumber;

      if (this.page.pageSize) {
        vars.page_size = this.page.pageSize; // eslint-disable-line camelcase
      }
    }

    return vars;
  }

}

export default AccommodationsByGeoRequest;
