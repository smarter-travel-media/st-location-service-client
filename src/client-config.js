/**
 * @module location-service-client
 */

/**
 * A configuration object for making requests to the location service
 * @class ClientConfig
 */
class ClientConfig {
  /**
   * The prefix that will be used when making any requests from the clients. When
   * this url is prefixed to the formed client requests a trailing slash will be added.
   * This url can be absolute or relative.
   * @attribute baseUrl
   * @type String
   * @required
   */
  /**
   *
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
