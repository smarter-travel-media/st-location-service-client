/**
 * @module location-service-client
 */
 import nanoajax from "nanoajax";

/**
 * The client that makes location service requests.
 *
 * @class Client
 * @constructor
 * @param {ClientConfig} the configuration for the location service client.
 */
class Client {

  constructor(clientConfig) {
    this.clientConfig = clientConfig;
  }

  /**
   * Returns a list of locations that match the provided suggest query.
   * @method suggestLocations
   * @param locationSuggestRequest the request object that
   * @param {Function} onSuccess a function that takes an array  of location suggest objects.
   * @param {Function} onError a function that should be called if the request fails.
   *                  The function should take a string which is the error message if there is one.
   */
  suggestLocations(locationSuggestRequest, onSuccess, onError) {
    this.executeRequest(locationSuggestRequest, onSuccess, onError);
  }

  /**
   * This method adds the base url to the constructed client request and then
   * binds the on success and error functions to the request.
   * @method executeRequest
   * @param {ClientRequest} request the request to make
   * @param {Function} onSuccess the function to be called on success
   * @param {Function} onError the function to be called on error
   */
   executeRequest(request, onSuccess, onError) {
     var url = this.clientConfig.baseUrl + "/" + request.createRequest();
     nanoajax.ajax({
       url: url,
       cors: true,
       method: "GET"
     }, function (responseCode, responseText) {
       if (responseCode === 200) {
         var responseJson;
         try {
           responseJson = JSON.parse(responseText);
         } catch (error) {
           onError(responseText);
         }
         onSuccess(responseJson);
       } else {
         onError(responseText);
       }
     });
   }
}

export default Client;
