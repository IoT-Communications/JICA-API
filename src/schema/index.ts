import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import User from '../entities/User';
import userResolver from './resolvers/userResolvers';
import deviceLocationResolver from './resolvers/deviceLocationResolver';

const typeDefs = importSchema(`${__dirname}/typeDefs.graphql`);

const resolvers = {
  Query: {
    ...userResolver.Query,
    ...deviceLocationResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};

export type contextType = {
  user: User,
  fcm: any,
  pubSub: any,
  plugBucket: any
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
