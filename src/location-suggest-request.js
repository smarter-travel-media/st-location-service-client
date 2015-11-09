/**
 * @module location-service-client
 */
import ClientRequest from "./client-request";

/**
 * This request contains all of the methods needed to build a request for the
 * location suggest endpoint.
 * @class LocationSuggestRequest
 * @extends ClientRequest
 * @constructor
 */
class LocationSuggestRequest extends ClientRequest {

  /**
   * The locale of the request.
   * @attribute locale
   * @type String
   * @required
   */
  /**
   * @method withLocale
   * @required
   * @param {String} the locale the request is made for
   * @return {LocationSuggestRequest}
   */
  withLocale(locale) {
    this.locale = locale;
    return this;
  }

  /**
   * An array of location type ids that suggestions should be returned for
   * @attribute locationTypes
   * @type Array
   * @required
   */
  /**
   * @method withLocationTypes
   * @required
   * @param {Array} types an array of location type ids to query for.
   * @return {LocationSuggestRequest}
   */
  withLocationTypes(types) {
    this.locationTypes = types;
    return this;
  }

  /**
   * The search query that location suggestions should be matched against
   * @attribute query
   * @type String
   * @required
   */
  /**
   * @method withQuery
   * @required
   * @param {String} the query string to get suggestions for
   * @return {LocationSuggestRequest}
   */
  withQuery(query) {
    this.query = query;
    return this;
  }

  /**
   * A boolean flag to toggle returning the locations city or airport with each
   * returned location
   * @attribute compound
   * @type Boolean
   * @required
   */
  /**
   * @method withCompoundLocations
   * @required
   * @param {Boolean} a flag for returning compound location types or not
   * @return {LocationSuggestRequest}
   */
  withCompoundLocations(compound) {
    this.compound = compound;
    return this;
  }

  /**
   * @override
   */
  createRequest() {
    if (!this.query || !this.locationTypes || !this.locale) {
      throw "Missing required data for location suggest request";
    }

    let query = this.query;
    let locationTypes = this.locationTypes.join(",");
    let locale = this.locale;
    let requestUrl = `/${locale}/suggest/type=${locationTypes}/?query=${query}`;

    if (typeof this.compound != "undefined") {
      let compound = this.compound ? 1 : 0;
      requestUrl += `&compound=${compound}`;
    }

    return requestUrl;

  }

}

export default LocationSuggestRequest;
