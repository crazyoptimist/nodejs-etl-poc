import { unzipSync } from "zlib";
import fs from "fs";

export function readSingleGzip(filePath: string) {
  const unzipped = unzipSync(fs.readFileSync(filePath)).toString("utf-8");
  return JSON.parse(unzipped);
}
