
import { ApolloServer } from 'apollo-server-lambda';
import depthLimit from 'graphql-depth-limit';
import schema from './graphql/schema';
import { getPostLoader, getUserLoader } from './mongoose';


const apolloServer = new ApolloServer({
  schema,
  // Avoid deep query with 7 levels
  validationRules: depthLimit(7),
  context: ({ req }: { req: any }) => ({
    userLoader: getUserLoader(),
    postLoader: getPostLoader(),
    loggedInUser: null
  })
});

// Export handler to use with Lambda via Serverless Framework
export const graphqlHandler = apolloServer.createHandler();
