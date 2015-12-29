import { expect } from "chai";
import {ProximityRequest} from "../../src/index";

describe("ProximityRequest", function() {
  it("constructs without error", function() {
    var request = new ProximityRequest();
  });

  it("Throws error when locale is not present", function() {
    var request = new ProximityRequest();
    request.withLocationTypes([10004]).fromTaId(60745).withRadius(100, "mi");
    expect(() => {request.createRequest()}).to.throw("Missing required data for proximity request");
  });

  it("Throws error when there is no origin point", function() {
    var request = new ProximityRequest();
    request.withLocationTypes([10004]).withLocale("en").withRadius(100, "mi");
    expect(() => {request.createRequest()}).to.throw("Missing required data for proximity request");
  });

  it("Throws error when location types are not present", function() {
    var request = new ProximityRequest();
    request.withLocale("en").fromAirportCode("BOS").withRadius(100, "mi")
    expect(() => {request.createRequest()}).to.throw("Missing required data for proximity request");
  });

  it("Creates a valid ta id url", function() {
    var request = new ProximityRequest();
    request.withLocationTypes([10004])
      .fromTaId(60745)
      .withRadius(10, "mi")
      .withLocale("en");
    expect(request.createRequest()).to.equal("en/proximity/type=10004/id/ta/60745?radius=10mi");
  });

  it("Creates a valid header url", function() {
    var request = new ProximityRequest();
    request.withLocationTypes([10004])
      .fromHeader()
      .withRadius(10, "mi")
      .withLocale("en");
    expect(request.createRequest()).to.equal("en/proximity/type=10004/header?radius=10mi");
  });

  it("Creates a valid airport code url", function() {
    var request = new ProximityRequest();
    request.withLocationTypes([10004])
      .fromAirportCode("BOS")
      .withRadius(10, "mi")
      .withLocale("en");
    expect(request.createRequest()).to.equal("en/proximity/type=10004/id/airport/BOS?radius=10mi");
  });

  it("Creates a valid url with compound", function() {
    var request = new ProximityRequest();
    request.withLocationTypes([10004])
      .fromAirportCode("BOS")
      .withRadius(10, "mi")
      .withCompoundLocations(true)
      .withLocale("en");
    expect(request.createRequest()).to.equal("en/proximity/type=10004/id/airport/BOS?radius=10mi&compound=1");
  });
});
