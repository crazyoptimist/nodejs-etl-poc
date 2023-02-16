import fs from "fs";
import path from "path";
import { KILO_BYTE, RESULT_FILE_PREFIX } from "./constants";
import { readSingleGzip } from "./helpers/read-single-gzip";
import { TransformedVisit } from "./types";

const DATA_SOURCE_PATH = "data-source";
const DATA_RESULT_PATH = "data-result";

export async function runPipeline(
  dataSourcePath: string,
  dataResultPath: string
) {
  let temp: TransformedVisit[] = [];
  try {
    const files = await fs.promises.readdir(dataSourcePath);
    for (const file of files) {
      const filePath = path.join(dataSourcePath, file);
      if (!filePath.endsWith(".gz")) {
        continue;
      }

      const visit = readSingleGzip(filePath);
      temp.push(visit);
      if (Buffer.byteLength(JSON.stringify(temp)) < 8 * KILO_BYTE) {
        continue;
      }
      temp.pop();
      fs.writeFileSync(
        `${RESULT_FILE_PREFIX}${Date.now()}`,
        JSON.stringify(temp)
      );
      temp = [];
    }
  } catch (e) {
    console.error(e);
  }
}

runPipeline(DATA_SOURCE_PATH, DATA_RESULT_PATH);
