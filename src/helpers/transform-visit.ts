import { TransformedVisit, Visit } from "../types";
import { parseUrl } from "./parse-url";

export function transformVisit(visit: Visit): TransformedVisit {
  return {
    timestamp: visit.ts,
    url_object: parseUrl(visit.u),
    ec: visit.e,
  };
}
