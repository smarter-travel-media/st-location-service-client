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
   * @param {LocationSuggestRequest} locationSuggestRequest the request object
   * @param {Function} onSuccess a function that takes an array  of location suggest objects.
   * @param {Function} onError a function that should be called if the request fails.
   *                  The function should take a string which is the error message if there is one.
   */
  suggestLocations(locationSuggestRequest, onSuccess, onError) {
    this.executeRequest(locationSuggestRequest, onSuccess, onError);
  }

  /**
   * Returns a list of locations that match the provided proximity query.
   * @method findLocationByProximity
   * @param {ProximityRequest} proximityRequest the request object
   * @param {Function} onSuccess a function that takes an array  of location suggest objects.
   * @param {Function} onError a function that should be called if the request fails.
   *                  The function should take a string which is the error message if there is one.
   */
  findLocationByProximity(proximityRequest, onSuccess, onError) {
    this.executeRequest(proximityRequest, onSuccess, onError);
  }

  /**
   * Returns locations matching the IDs specified in the request.
   * @method findByTAID
   * @param {TAIDRequest} request
   * @param {Function} onSuccess takes an object mapping ids to locations; ids that could
   * not be mapped will not be present as keys
   * @param {Function} onError called on failure (e.g. 500 response code); passed the response body
   */
  findByTAID(request, onSuccess, onError) {
    this.ajax(request, function(responseCode, responseText) {
      if (responseCode === 200) {
        try {
          onSuccess(JSON.parse(responseText));
        } catch(e) {
          onError(responseText);
        }
      } else if (responseCode === 404) {
        // special case for ID requests: service 404s if none of the IDs were found
        onSuccess({});
      } else {
        onError(responseText);
      }
    });
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
     this.ajax(request, function (responseCode, responseText) {
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

   /**
    * @private
    * @property {ClientRequest} request
    * @property {Function} cb function(responseCode, responseText) { ... }
    */
   ajax(request, cb) {
     var url = this.clientConfig.baseUrl + "/" + request.createRequest();
     nanoajax.ajax({
       url: url,
       cors: true,
       method: "GET"
     }, cb);
   }
}

export default Client;
