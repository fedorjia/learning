// 执行
/**
 * 1. visit: localhost:4000/graphql
 *    run: {hello}
 *
 * 2. curl:
 *    curl -X POST  -H "Content-Type: application/json"  -d '{"query": "{ hello }"}' http://localhost:4000/graphql | python -m json.tool
 *
 * 3. 打开 http://localhost:4000 ，开启开发者控制台
       fetch('/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({query: "{ hello }"})
        })
       .then(r => r.json())
       .then(data => console.log('data returned:', data));
 */

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// 使用 GraphQL Schema Language 创建一个 schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// root 提供所有 API 入口端点相应的解析器函数
const root = {
  hello: () => {
    return 'Hello world!';
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
