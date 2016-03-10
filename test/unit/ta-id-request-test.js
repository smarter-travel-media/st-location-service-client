import { expect } from "chai";
import {TAIDRequest} from "../../src/index";

describe("TAIDRequest", function() {
  beforeEach(function() {
    this.request = new TAIDRequest();
  });

  it("creates a url", function() {
    this.request.withIDs([60745, 4242]).withLocale("en").withCompoundLocations(false);
    expect(this.request.createRequest()).to.equal("en/ids/ta/60745,4242?compound=0");
  });

  it("throws without a locale", function() {
    this.request.withIDs([4242]);
    expect(_ => this.request.createRequest()).to.throw();
  });

  it("throws without ids", function() {
    this.request.withLocale("en");
    expect(_ => this.request.createRequest()).to.throw();
  });
});
