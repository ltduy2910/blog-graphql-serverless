
import { ApolloServer } from 'apollo-server-lambda';
import depthLimit from 'graphql-depth-limit';
import schema from './graphql/schema';

const apolloServer = new ApolloServer({
  schema,
  validationRules: depthLimit(7)
});

export const graphqlHandler = apolloServer.createHandler();
