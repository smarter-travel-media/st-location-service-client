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
   * @override
   */
  createRequest() {
    if (!this.query || !this.locationTypes || !this.locale) {
      throw "Missing required data for location suggest request";
    }

    var query = encodeURIComponent(this.query);
    var locationTypes = this.locationTypes.map((locationType) => { return encodeURIComponent(locationType); }).join(",");
    var locale = encodeURIComponent(this.locale);
    var requestUrl = `${locale}/suggest/type=${locationTypes}/?query=${query}`;

    if (typeof this.compound != "undefined") {
      var compound = this.compound ? 1 : 0;
      requestUrl += `&compound=${compound}`;
    }

    return requestUrl;

  }

}

export default LocationSuggestRequest;
