import fs from "fs";
import path from "path";
import { readSingleGzip } from "./helpers/read-single-gzip";
import { runPipeline } from "./main";
import { TransformedVisit, Visit } from "./types";

describe("runPipeline", () => {
  const dataSourcePath = "testdata/sample-source";
  const dataResultPath = "testdata/sample-result";
  let want: Visit[] = [];

  beforeAll(async () => {
    const files = await fs.promises.readdir(dataSourcePath);

    for (const file of files) {
      const filePath = path.join(dataSourcePath, file);
      if (filePath.endsWith(".gz")) {
        want.push(readSingleGzip(filePath));
      }
    }

    if (!want.length) {
      throw new Error("failed to read test data");
    }

    fs.rmSync(dataResultPath, { recursive: true, force: true });
  });

  test("it should process all data entered", async () => {
    let got: TransformedVisit[] = [];

    const files = await fs.promises.readdir(dataSourcePath);
    await runPipeline(dataSourcePath, dataResultPath);
    for (const file of files) {
      const filePath = path.join(dataSourcePath, file);
      if (filePath.endsWith(".json")) {
        const temp = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        got = [...got, ...temp];
      }
    }

    expect(got.length).toEqual(want.length);
  });
  test.todo("created file size should not exceed 8KB");
});
