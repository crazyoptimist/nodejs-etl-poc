type Visit = {
  ts: Date;
  u: string;
  e: any[];
};

type TransformedVisit = {
  timestamp: Date;
  url_object: UrlObject;
  ec: any[];
};

type UrlObject = {
  domain: string | null;
  path: string | null;
  query_object: any;
  hash: string | null;
};
