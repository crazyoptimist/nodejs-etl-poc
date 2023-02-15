import { readSingleGzip } from "./read-single-gzip";

describe("readSingleGzip", () => {
  test("it returns an object stored in the single gzip file", () => {
    const sampleFile = "testdata/sample-source/t1669976028340.json.gz";
    const want = {
      ts: 1669976028340,
      u: "https://www.example.org/ho/ez#w;#n?r?h",
      e: [{ et: "dl", n: "digitalData", u: { page_name: "store", store_id: 153 } }],
    };
    const got = readSingleGzip(sampleFile);

    expect(got).toEqual(want);
  });
});
