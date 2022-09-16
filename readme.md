# Query Builder

A simple query language

Node | React | JavaScript

Note: This is just a builder and parser. When used in query param, use encodeURIComponent() to encode the query string.

## Install

```js
npm install simple-query-ln
```
### Where can be used
- Can be used to generate string based query language
- Can be used to create filter query

## API
There are primarily two apis
- Query Builder - To build the query language
- Query Parser - To parse the query language and get object

### Query Builder

```js
import { QueryBuilder } from 'simple-query-ln'

const queryBuilder = new QueryBuilder();
queryBuilder.addFilter('name','Arya');
queryBuilder.addFilter('age',25,QueryBuilder.operator.greater_or_equal);
queryBuilder.addFilter('age',30,'less_or_equal');

console.log(queryBuilder.stringify());
// name:Arya,age[greater_or_equal]:25,age[less_or_equal]:30
```

### Query Parser

```js
import { QueryParser } from 'simple-query-ln'

const queryParser = new QueryParser();
const parsedObject = queryParser.parse('name:Arya,age[greater_or_equal]:25,age[less_or_equal]:30');

console.log(parsedObject);
/* 
[
  { 
    field: "name", 
    operators: [ 
      {  
        value: "Arya" 
      } 
    ]
  },
  { 
    field: "age",
    operators: [
      {
        value: 25,
        operator: "greater_or_equal"
      },
      {
        value: 30,
        operator: "less_or_equal"
      }
    ]
  }
]

*/
```

### TODO
- method to replace the existing filter with same name
