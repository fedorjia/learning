import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';

import schema from './graphql';

const app = express();

// GraphqQL server route
app.use('/graphql', graphqlHTTP(req => ({
  schema,
  pretty: true,
  graphiql: true
})));

// Connect mongo database
mongoose.connect('mongodb://localhost/graphql');

// set mongoose valueof
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

// start server
const server = app.listen(8080, () => {
  console.log('Listening at port', server.address().port);
});
