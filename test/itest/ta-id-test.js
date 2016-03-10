import { expect } from "chai";
import config from "../util/config-loader";
import {Client, ClientConfig, TAIDRequest} from "../../src/index";

describe("Request by TAID", function() {
  beforeEach(function() {
    var clientConfig = new ClientConfig().withBaseUrl(config.locationServiceUrl);
    this.client = new Client(clientConfig);
  });

  it("gets boston", function(done) {
    var request = new TAIDRequest().withLocale("en").withIDs([60745]);
    this.client.findByTAID(request, function(locations) {
      var boston = locations[60745];
      expect(boston.id).to.eql(60745);
      expect(boston.primaryName).to.eql("Boston");
      done();
    });
  });

  it("non-existant id is not present", function(done) {
    var request = new TAIDRequest().withLocale("en").withIDs([60745, 424242]);
    this.client.findByTAID(request, function(locations) {
      expect(locations[60745].id).to.eql(60745);
      expect(locations[424242]).to.eql(undefined);
      done();
    });
  });

  it("gets an empty result", function(done) {
    var request = new TAIDRequest().withLocale("en").withIDs([424242]);
    this.client.findByTAID(request, function(locations) {
      expect(locations).to.eql({});
      done();
    });
  });
});
