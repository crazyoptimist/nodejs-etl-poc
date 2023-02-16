# ETL Processing Test

[![build & test](https://github.com/crazyoptimist/nodejs-etl-poc/actions/workflows/build-and-test.yaml/badge.svg)](https://github.com/crazyoptimist/nodejs-etl-poc/actions/workflows/build-and-test.yaml)

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

### Design

- Source data format is known, one gzip file contains only one JSON object
- Read one gzip at a time
- Perform the transformation
- Buffer the transformed data, buffer capacity 8Kb
- Write the buffered array of transformed objects to a file
- Repeat the process as a pipeline

### Build & Run

```
npm install
npm run build
npm start
```

This applicaiton is to run as a one time job. In a real scenario, the pipeline will be run as a long running job.

### Development

```
npm install
npm run dev
```

### Test

```
npm test
```
