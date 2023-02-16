export type Visit = {
  ts: number;
  u: string;
  e: any[];
};

export type TransformedVisit = {
  timestamp: number;
  url_object: UrlObject;
  ec: any[];
};

export type UrlObject = {
  domain: string | null;
  path: string | null;
  query_object: any;
  hash: string | null;
};
