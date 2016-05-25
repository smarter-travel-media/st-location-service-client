import { expect } from "chai";
import nanoajax from "nanoajax";
import sinon from "sinon";
import {Client, ClientConfig, LocationSuggestRequest, ProximityRequest, TAIDRequest, AccommodationsByGeoRequest} from "../../src/index";

describe("Client", function() {
  var client;
  var suggestRequest = new LocationSuggestRequest()
    .withLocale("en")
    .withLocationTypes([10004])
    .withCompoundLocations(true)
    .withQuery("Bos");
  var proximityRequest = new ProximityRequest()
    .withLocale("en")
    .withLocationTypes([10004])
    .withCompoundLocations(true)
    .withRadius(100, "mi")
    .fromAirportCode("BOS")
  beforeEach(function() {
    var clientConfig = new ClientConfig().withBaseUrl("");
    client = new Client(clientConfig);

  });

  it("Handles suggest success", function (done) {
    var successSpy = sinon.spy();
    var errorSpy = sinon.spy();
    sinon.stub(nanoajax, 'ajax').callsArgWith(1, 200, "[]");

    client.suggestLocations(suggestRequest, successSpy, errorSpy);

    expect(nanoajax.ajax.calledOnce).to.be.true;
    expect(nanoajax.ajax.args[0][0]).to.deep.equal({
      url: "/en/suggest/type=10004/?query=Bos&compound=1",
      cors: true,
      method: "GET"
    });
    expect(successSpy.calledOnce).to.be.true;
    expect(successSpy.calledWith([])).to.be.true;

    nanoajax.ajax.restore();
    done();
  });

  it("Handles suggest error", function (done) {
    var successSpy = sinon.spy();
    var errorSpy = sinon.spy();
    sinon.stub(nanoajax, 'ajax').callsArgWith(1, 400, "Bad Request");

    client.suggestLocations(suggestRequest, successSpy, errorSpy);

    expect(nanoajax.ajax.calledOnce).to.be.true;
    expect(nanoajax.ajax.args[0][0]).to.deep.equal({
      url: "/en/suggest/type=10004/?query=Bos&compound=1",
      cors: true,
      method: "GET"
    });
    expect(errorSpy.calledOnce).to.be.true;
    expect(errorSpy.calledWith("Bad Request")).to.be.true;

    nanoajax.ajax.restore();
    done();
  });

  it("Handles proximity success", function (done) {
    var successSpy = sinon.spy();
    var errorSpy = sinon.spy();
    sinon.stub(nanoajax, 'ajax').callsArgWith(1, 200, "[]");

    client.findLocationByProximity(proximityRequest, successSpy, errorSpy);

    expect(nanoajax.ajax.calledOnce).to.be.true;
    expect(nanoajax.ajax.args[0][0]).to.deep.equal({
      url: "/en/proximity/type=10004/id/airport/BOS?radius=100mi&compound=1",
      cors: true,
      method: "GET"
    });
    expect(successSpy.calledOnce).to.be.true;
    expect(successSpy.calledWith([])).to.be.true;

    nanoajax.ajax.restore();
    done();
  });

  describe("#findByTAID", function() {
    beforeEach(function() {
      this.request = new TAIDRequest().withLocale("en").withIDs([4242]);
      this.onSuccess = sinon.spy();
      this.onError = sinon.spy();
      sinon.stub(nanoajax, "ajax");
    });

    afterEach(function() {
      nanoajax.ajax.restore();
    });

    it("makes a successful request", function() {
      nanoajax.ajax.callsArgWith(1, 200, "{}");
      client.findByTAID(this.request, this.onSuccess, this.onError);
      sinon.assert.calledWith(this.onSuccess, {});
    });

    it("makes an errorful request", function() {
      nanoajax.ajax.callsArgWith(1, 500, "");
      client.findByTAID(this.request, this.onSuccess, this.onError);
      sinon.assert.called(this.onError);
    });
  });

  describe("#accommodationsByGeo", function () {
    beforeEach(function() {
      this.request = new AccommodationsByGeoRequest().withLocale("en").withGeoId(60745);
      this.onSuccess = sinon.spy();
      this.onError = sinon.spy();
      sinon.stub(nanoajax, "ajax");
    });

    afterEach(function() {
      nanoajax.ajax.restore();
    });

    it("makes a successful request", function() {
      nanoajax.ajax.callsArgWith(1, 200, "{}");
      client.accommodationsByGeo(this.request, this.onSuccess, this.onError);
      sinon.assert.calledWith(this.onSuccess, {});
    });

    it("makes an errorful request", function() {
      nanoajax.ajax.callsArgWith(1, 500, "");
      client.accommodationsByGeo(this.request, this.onSuccess, this.onError);
      sinon.assert.called(this.onError);
    });
  });
});
