type Visit = {
  ts: number;
  u: string;
  e: any[];
};

type TransformedVisit = {
  timestamp: number;
  url_object: UrlObject;
  ec: any[];
};

type UrlObject = {
  domain: string | null;
  path: string | null;
  query_object: any;
  hash: string | null;
};
