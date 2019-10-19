import { makeExecutableSchema, ApolloServerExpressConfig } from 'apollo-server-express';
import UserService from '../services/User';
import { rootTypeDefs, userTypeDefs, dateTypeDefs } from './typeDefs';
import { userResolvers, dateResolvers } from './resolvers';
import { getContext } from './context';
import { shallowMerge } from '../utils/shallowMerge';

/*
 * Define the ApolloServerExpressConfig here, which includes the 
 * schema (make up of typeDefs and resolvers), and the context 
 */

const resolvers = shallowMerge([userResolvers, dateResolvers]);
const typeDefs = [rootTypeDefs, userTypeDefs, dateTypeDefs];
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const context = getContext({ UserService });

export const config: ApolloServerExpressConfig = {
  schema,
  context
}