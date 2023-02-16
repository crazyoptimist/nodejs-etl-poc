import fs from "fs";
import path from "path";
import { KILO_BYTE, RESULT_FILE_PREFIX } from "./constants";
import { readSingleGzip } from "./helpers/read-single-gzip";
import { transformVisit } from "./helpers/transform-visit";
import { TransformedVisit } from "./types";

const DATA_SOURCE_PATH = "data-source";
const DATA_RESULT_PATH = "data-result";

export async function runPipeline(
  dataSourcePath: string,
  dataResultPath: string
) {
  let temp: TransformedVisit[] = [];
  const files = await fs.promises.readdir(dataSourcePath);
  const lengthOfSource = files.length;

  for (let i = 0; i < lengthOfSource; i++) {
    const sourceFilePath = path.join(dataSourcePath, files[i]);
    if (!sourceFilePath.endsWith(".gz")) {
      continue;
    }
    const resultFilePath = path.join(
      dataResultPath,
      `${RESULT_FILE_PREFIX}${Date.now()}.json`
    );

    const visit = readSingleGzip(sourceFilePath);
    const transformedVisit = transformVisit(visit);
    temp.push(transformedVisit);

    if (i === lengthOfSource - 1) {
      writeDataToLocalDisk(resultFilePath, temp);
      break;
    }

    if (Buffer.byteLength(JSON.stringify(temp)) < 8 * KILO_BYTE) {
      continue;
    }

    temp.pop();
    writeDataToLocalDisk(resultFilePath, temp);
    temp = [transformedVisit];
  }
}

function writeDataToLocalDisk(fileName: string, data: any): void {
  try {
    fs.writeFileSync(fileName, JSON.stringify(data));
  } catch (e) {
    console.error("error during writing results to a local disk");
  }
}

runPipeline(DATA_SOURCE_PATH, DATA_RESULT_PATH);
