import { expect, should } from "chai";
import nanoajax from "nanoajax";
import sinon from "sinon";
import {Client, ClientConfig, LocationSuggestRequest} from "../../src/index";
import config from "../util/config-loader";

describe("Suggest IT Tests", function() {
  var client;
  var suggestRequest;

  var containsIdFunction = function (taId, done) {
    return (results) => {
      for (var index in results) {
        if (results[index].location.id === taId) {
          done();
        }
      }
      throw new Error("failure: TaId was not in the results: " + taId);
    };
  }

  var errorFunction = function (shouldFail, done) {
    return (msg) => {
      if (shouldFail) {
        done();
      } else {
        throw new Error("failure: Request failed with message: " + msg);
      }
    };
  }

  beforeEach(function() {
    var clientConfig = new ClientConfig().withBaseUrl(config.locationServiceUrl);
    client = new Client(clientConfig);
  });

  it("Returns boston when requesting a compound city with query = 'bos''", function (done) {
    var suggestRequest = new LocationSuggestRequest()
      .withLocale("en")
      .withLocationTypes([10004])
      .withCompoundLocations(true)
      .withQuery("Bos");

    console.log(suggestRequest.createRequest());
    client.suggestLocations(suggestRequest, containsIdFunction(60745, done), errorFunction(false, done));
  });

  it("Returns boston when requesting a city with query = 'bos''", function (done) {
    var suggestRequest = new LocationSuggestRequest()
      .withLocale("en")
      .withLocationTypes([10004])
      .withCompoundLocations(false)
      .withQuery("Bos");

    console.log(suggestRequest.createRequest());
    client.suggestLocations(suggestRequest, containsIdFunction(60745, done), errorFunction(false, done));
  });
});
