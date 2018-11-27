// 执行
/**
 * 1. graphql:
 *
    添加：
    mutation {
      createMessage(input: {
        author: "fedor",
        content: "hope is a good thing！",
      }) {
        id
      }
    }

    查询：
    {
      getMessage(id: "34c6606439a41962dd65") {
       id
       author
       content
      }
    }

 * 2. 打开 http://localhost:4000 ，开启开发者控制台
     var author = 'andy';
     var content = 'hope is a good thing';
     var query = `mutation CreateMessage($input: MessageInput) {
        createMessage(input: $input) {
          id
        }
      }`;

     fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            input: {
              author,
              content,
            }
          }
        })
      })
     .then(r => r.json())
     .then(data => console.log('data returned:', data));
 */

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// 使用 GraphQL schema language 构建 schema
const schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

// 如果 Message 拥有复杂字段，我们把它们放在这个对象里面。
class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

// 映射 username 到 content
const fakeDatabase = {};

const root = {
  getMessage: function ({id}) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: function ({input}) {
    // Create a random id for our "database".
    const id = require('crypto').randomBytes(10).toString('hex');

    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  updateMessage: function ({id, input}) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
