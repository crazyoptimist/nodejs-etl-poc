import { unzipSync } from "zlib";
import fs from "fs";

export function readSingleGzip(filePath: string) {
  try {
    const unzipped = unzipSync(fs.readFileSync(filePath)).toString("utf-8");
    return JSON.parse(unzipped);
  } catch (e) {
    console.error("error while reading single gzip file: ", filePath);
  }
}
