import { expect } from "chai";
import {LocationSuggestRequest} from "../src/index";

describe("LocationSuggestRequest", function() {
  it("constructs without error", function() {
    var request = new LocationSuggestRequest();
  });

  it("Throws error when locale is not present", function() {
    var request = new LocationSuggestRequest();
    request.withLocationTypes([10004]).withQuery("Bos");
    expect(() => {request.createRequest()}).to.throw("Missing required data for location suggest request");
  });

  it("Throws error when query is not present", function() {
    var request = new LocationSuggestRequest();
    request.withLocationTypes([10004]).withLocale("en");
    expect(() => {request.createRequest()}).to.throw("Missing required data for location suggest request");
  });

  it("Throws error when location types are not present", function() {
    var request = new LocationSuggestRequest();
    request.withLocale("en").withQuery("Bos");
    expect(() => {request.createRequest()}).to.throw("Missing required data for location suggest request");
  });

  it("Creates a valid url without compound", function() {
    var request = new LocationSuggestRequest();
    request.withLocationTypes([10004])
      .withQuery("Bos")
      .withLocale("en");
    expect(request.createRequest()).to.equal("en/suggest/type=10004/?query=Bos");
  });

  it("Creates a valid url with compound", function() {
    var request = new LocationSuggestRequest();
    request.withLocationTypes([10004])
      .withQuery("Bos")
      .withLocale("en")
      .withCompoundLocations(false);
    expect(request.createRequest()).to.equal("en/suggest/type=10004/?query=Bos&compound=0");
  });
});
