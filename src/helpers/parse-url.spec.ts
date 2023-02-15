import url from "url";

describe("parseUrl", () => {
  test("it returns a valid url_object given a url", () => {
    const sampleUrl = "https://www.test.com/products/productA.html?a=5435&b=test#reviews";
    const want = {
      domain: "www.test.com",
      path: "/products/productA.html",
      query_object: {
        a: "5435",
        b: "test",
      },
      hash: "#reviews",
    };

    const got = parseUrl(sampleUrl);

    expect(got).toEqual(want);
  });
});
