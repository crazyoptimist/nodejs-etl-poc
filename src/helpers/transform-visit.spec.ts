describe("transformVisit", () => {
  test("it returns a valid transformed visit object", () => {
    const sampleVisit = {
      ts: 1669976029630,
      u: "https://www.imaginary.co.uk/cfgrg/gxzhb",
      e: [
        { et: "j", er: { m: "general error", s: "call stack", l: 35 } },
        { et: "j", er: { m: "random error", s: "call stack", l: 18 } },
        { et: "v", p: ["prop61", "prop72", "eVar56", "prop45"] },
        { et: "j", er: { m: "unknown error", s: "call stack", l: 54 } },
        { et: "ur" },
        { et: "v", p: ["eVar88", "prop78", "event99", "prop9"] },
        { et: "ur" },
        { et: "dl", n: "_dl", u: { page_name: "about" } },
        { et: "v", p: ["event81", "event93", "event11"] },
        { et: "j", er: { m: "simulated error", s: "call stack", l: 66 } },
      ],
    };

    const want = {
      timestamp: sampleVisit.ts,
      url_object: {
        domain: "www.imaginary.co.uk",
        path: "/cfgrg/gxzhb",
        query_object: null,
        hash: null,
      },
      ec: sampleVisit.e,
    };

    const got = transformVisit(sampleVisit);

    expect(got).toEqual(want);
  });
});
