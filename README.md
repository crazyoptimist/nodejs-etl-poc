# ETL Processing Test

### Requirements

- Extract JSON objects from files on a local disk
- Transform the extracted objects into a given JSON format
- Save the new objects to files on a local disk.

Example input object

```json
{
  "ts": 1234567890,                                                         // unix timestamp
  "u": "https://www.test.com/products/productA.html?a=5435&b=test#reviews"  // a url
  "e": [ {list of events} ]                                                 // an array of objects, each object represents an event
}
```

Example output object

```json
{
  "timestamp": ....                   // same timestamp as parent
  "url_object": {                     // parsed URL object
    "domain": "www.test.com"          // domain
    "path": "/products/productA.html" // path
    "query_object": {                 // query string object e.g. from ?q1=val1&q2=val2
      "a": "5435",
      "b": "test",
      ...
    },
    "hash": "#reviews"                // hash
  }
  "ec": {original event content}
}
```
