/**
 * @module location-service-client
 */

/**
 * A configuration object for making requests to the location service
 * @class ClientConfig
 */
class ClientConfig {
  /**
   * The prefix that should be used when making queries against the locaiton service
   * @attribute baseUrl
   * @type String
   * @required
   */
  /**
   * @method withBaseUrl
   * @param {String} baseUrl the base url for the location service
   * @return {ClientConfig}
   */
  withBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
    return this;
  }
}

export default ClientConfig;
