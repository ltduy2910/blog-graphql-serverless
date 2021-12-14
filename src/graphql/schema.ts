import { DateTimeTypeDefinition, DateTimeResolver } from 'graphql-scalars';
import * as rootDefs from './schemas/schema.graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers/resolvers';

const schema = makeExecutableSchema({
  typeDefs: [
    DateTimeTypeDefinition,
    rootDefs
  ],
  resolvers: {
    DateTime: DateTimeResolver,
    ...resolvers
  },
});

export default schema;