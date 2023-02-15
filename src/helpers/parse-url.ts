import url from "url";
import querystring from "querystring";

export function parseUrl(urlString: string): UrlObject {
  const parsedUrl = url.parse(urlString);
  return {
    domain: parsedUrl.hostname,
    path: parsedUrl.pathname,
    query_object: querystring.parse(parsedUrl.query as string),
    hash: parsedUrl.hash,
  };
}
