import fs from "fs";
import path from "path";
import { runPipeline } from "./main";

describe("runPipeline", () => {
  const dataSourcePath = "testdata/sample-source";
  const dataResultPath = "testdata/sample-result";

  test("it should process all the source objects", async () => {
    let want = 0;
    let got = 0;

    const sourceFiles = await fs.promises.readdir(dataSourcePath);
    for (const file of sourceFiles) {
      const filePath = path.join(dataSourcePath, file);
      if (filePath.endsWith(".gz")) {
        want += 1;
      }
    }

    if (!want) {
      throw new Error("error while reading test data");
    }

    if (fs.existsSync(dataResultPath)) {
      fs.rmSync(dataResultPath, { recursive: true, force: true });
    }

    fs.mkdirSync(dataResultPath);

    await runPipeline(dataSourcePath, dataResultPath);

    const resultFiles = await fs.promises.readdir(dataResultPath);
    for (const file of resultFiles) {
      const filePath = path.join(dataResultPath, file);
      if (filePath.endsWith(".json")) {
        const temp = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        got += temp.length;
      }
    }

    expect(got).toEqual(want);
  });
  test.todo("created file size should not exceed 8KB");
});
