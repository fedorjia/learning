// 执行
/**
 * 1. visit: localhost:4000/graphql
 *    run: { rollDice(numDice: 3, numSides: 6) }

 * 2. 打开 http://localhost:4000 ，开启开发者控制台
       var dice = 3;
       var sides = 6;
       var query = `query RollDice($dice: Int!, $sides: Int) {
        rollDice(numDice: $dice, numSides: $sides)
       }`;

       fetch('/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { dice, sides },
          })
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
    hello: String,
    
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// root 提供所有 API 入口端点相应的解析器函数
const root = {
  hello: () => {
    return 'Hello world!';
  },

  rollDice: function ({numDice, numSides}) {
    let output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
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
