import { expect } from "chai";
import {AccommodationsByGeoRequest} from "../../src/index";

describe("AccommodationsByGeoRequest", function() {
  it("constructs without error", function() {
    var request = new AccommodationsByGeoRequest();
  });

  it("Throws error when locale is not present", function() {
    var request = new AccommodationsByGeoRequest();
    request.withGeoId(60745);
    expect(() => {request.createRequest()}).to.throw("Missing required data for accommodation by geo id request");
  });

  it("Throws error when geo id is not present", function() {
    var request = new AccommodationsByGeoRequest();
    request.withLocale("en");
    expect(() => {request.createRequest()}).to.throw("Missing required data for accommodation by geo id request");
  });

  it("Creates a valid url without optional params", function() {
    var request = new AccommodationsByGeoRequest();
    request.withGeoId(60745)
      .withLocale("en");
    expect(request.createRequest()).to.equal("en/ids/ta/60745/accommodations;?");
  });

  it("Creates a valid url with compound", function() {
    var request = new AccommodationsByGeoRequest();
    request.withGeoId(60745)
      .withLocale("en")
      .withCompoundLocations(false);
    expect(request.createRequest()).to.equal("en/ids/ta/60745/accommodations;?compound=0");
  });

  it("Creates a valid url with different sort options", function() {
    var request = new AccommodationsByGeoRequest();
    request.withGeoId(60745)
      .withLocale("en")
      .withCompoundLocations(false)
      .withSort("revenue", false, "sqpny", "US");
    expect(request.createRequest()).to.equal("en/ids/ta/60745/accommodations;?compound=0&sort=revenue%2Basc&sortCountry=US&revenueType=sqpny");

    request = new AccommodationsByGeoRequest();
    request.withGeoId(60745)
      .withLocale("en")
      .withCompoundLocations(false)
      .withSort("revenue", false, null, null);
    expect(request.createRequest()).to.equal("en/ids/ta/60745/accommodations;?compound=0&sort=revenue%2Basc");

    request = new AccommodationsByGeoRequest();
    request.withGeoId(60745)
      .withLocale("en")
      .withCompoundLocations(false)
      .withSort("revenue", false, "sqpny", null);
    expect(request.createRequest()).to.equal("en/ids/ta/60745/accommodations;?compound=0&sort=revenue%2Basc&revenueType=sqpny");

    request = new AccommodationsByGeoRequest();
    request.withGeoId(60745)
      .withLocale("en")
      .withCompoundLocations(false)
      .withSort("revenue", false, null, "US");
    expect(request.createRequest()).to.equal("en/ids/ta/60745/accommodations;?compound=0&sort=revenue%2Basc&sortCountry=US");
  });

  it("Creates a valid url with filters", function() {
    var request = new AccommodationsByGeoRequest();
    request.withGeoId(60745)
      .withLocale("en")
      .withCompoundLocations(false)
      .withPriceRange(0, 300, "USD")
      .withSubTypeIds([1,2,3,4])
      .withExcludedIds([4,3,2,1])
      .withAmenityIds([34,15])
      .withStarRatings([30,35,40,45,50]);
    expect(request.createRequest()).to.equal("en/ids/ta/60745/accommodations;subtype=1%2C2%2C3%2C4;price=0-300USD;exclude=4%2C3%2C2%2C1;stars=30%2C35%2C40%2C45%2C50;amenities=34%2C15?compound=0");
  });
});
