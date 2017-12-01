# load-graphql-schema

### How to use

To install the library:

> npm install load-graphql-schema

Use on your js project:

```javascript
const loadSchema = require('load-graphql-schema');
const const { makeExecutableSchema } = require('graphql-tools');

const mySchema = loadSchema('./mySchema.graphql');
const myResolvers = {
    ... // resolvers implemenation
};

const schema = makeExecutableSchema({
  mySchema,
  myResolvers,
});
```