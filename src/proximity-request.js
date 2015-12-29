/**
 * @module location-service-client
 */
import ClientRequest from "./client-request";

/**
 * This request contains all of the methods needed to build a request for the
 * proximity endpoint.
 * @class LocationSuggestRequest
 * @extends ClientRequest
 * @constructor
 */
class ProximityRequest extends ClientRequest {

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
   * @return {ProximityRequest}
   */
  withLocationTypes(types) {
    this.locationTypes = types;
    return this;
  }

  /**
   * A string representation of the radius for the search
   * @attribute radius
   * @type String
   * @required
   */
  /**
   * @method withRadius
   * @required
   * @param {Integer} distance the radius distance
   * @param {String} unit the distance unit (mi, km)
   * @return {ProximityRequest}
   */
  withRadius(distance, unit) {
    this.radius = `${distance}${unit}`;
    return this;
  }

  /**
   * The airport code to do a raduis search from
   * @attribute airCode
   * @type String
   */
  /**
   * @method fromAirportCode
   * @param {String} 3 letter airport code
   * @return {ProximityRequest}
   */
  fromAirportCode(code) {
    this.airCode = code;
    return this;
  }

  /**
   * The airport code to do a raduis search from
   * @attribute taId
   * @type Integer
   */
  /**
   * @method fromAirportCode
   * @param {Integer} the TaId to look up around
   * @return {ProximityRequest}
   */
  fromTaId(id) {
    this.taId = id;
    return this;
  }

  /**
   * The airport code to do a raduis search from
   * @attribute useHeader
   * @type Boolean
   */
  /**
   * @method fromHeader
   * @return {ProximityRequest}
   */
  fromHeader() {
    this.useHeader = true;
    return this;
  }

  /**
   * @override
   */
  createRequest() {
    if (!this.locationTypes || !this.locale || !this.radius) {
      throw "Missing required data for proximity request";
    }

    var locationTypes = this.locationTypes.map((locationType) => { return encodeURIComponent(locationType); }).join(",");
    var locale = encodeURIComponent(this.locale);
    var requestUrl = `${locale}/proximity/type=${locationTypes}`;
    if (this.useHeader) {
      requestUrl = `${requestUrl}/header?radius=${this.radius}`;
    } else if (this.airCode) {
      requestUrl = `${requestUrl}/id/airport/${this.airCode}?radius=${this.radius}`;
    } else if (this.taId) {
      requestUrl = `${requestUrl}/id/ta/${this.taId}?radius=${this.radius}`;
    } else {
      throw "Missing required data for proximity request";
    }

    if (typeof this.compound != "undefined") {
      var compound = this.compound ? 1 : 0;
      requestUrl += `&compound=${compound}`;
    }

    return requestUrl;

  }

}

export default ProximityRequest;
