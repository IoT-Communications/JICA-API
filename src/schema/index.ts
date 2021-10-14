import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import User from '../entities/User';
import userResolver from './resolvers/userResolvers';
import deviceLocationResolver from './resolvers/deviceLocationResolver';
import deviceTempResolver from './resolvers/deviceTempResolver'
import deviceAlarmResolver from './resolvers/deviceAlarmResolver'
import deviceBatteryResolver from './resolvers/deviceBatteryResolver'
import deviceHealthResolver from './resolvers/deviceHealthResolver'

const typeDefs = importSchema(`${__dirname}/typeDefs.graphql`);

const resolvers = {
  Query: {
    ...userResolver.Query,
    ...deviceLocationResolver.Query,
    ...deviceTempResolver.Query,
    ...deviceAlarmResolver.Query,
    ...deviceBatteryResolver.Query,
    ...deviceHealthResolver.Query,
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
