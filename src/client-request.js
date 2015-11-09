/**
 * @module location-service-client
 */

/**
 * The 'interface' that all request objects should extend.
 * @interface ClientRequest
 */
class ClientRequest {

  /**
   * This method returns the location service uri path with query param string
   * needed to query the location service.
   * @method createRequest
   * @return the URI path with query param string for the request
   * @throws {Error} if the request is not properly formed.
   */
  createRequest() {
    throw "'createRequest' Method Not Implemented";
  }
}

export default ClientRequest;
