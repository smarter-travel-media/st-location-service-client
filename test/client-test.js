import { expect } from "chai";
import nanoajax from "nanoajax";
import sinon from "sinon";
import {Client, ClientConfig, LocationSuggestRequest} from "../src/index";

describe("Client", function() {
  var client;
  var suggestRequest = new LocationSuggestRequest().withLocale("en").withLocationTypes([10004]).withCompoundLocations(true).withQuery("Bos")
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
});
