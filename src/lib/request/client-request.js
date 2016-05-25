/**
 * @module location-service-client
 */

/**
 * The 'interface' that all request objects should extend.
 * @interface ClientRequest
 */
class ClientRequest {

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
   * This method returns the location service uri path with query param string
   * needed to query the location service. This should not have a leading slash.
   * @method createRequest
   * @return the URI path with query param string for the request
   * @throws {Error} if the request is not properly formed.
   */
  createRequest() {
    throw "'createRequest' Method Not Implemented";
  }
}

export default ClientRequest;
