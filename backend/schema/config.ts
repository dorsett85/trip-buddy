import { makeExecutableSchema } from 'apollo-server-express';
import UserService from '../services/User';
import { rootTypeDefs, userTypeDefs, dateTypeDefs } from './typeDefs';
import { userResolvers, dateResolvers } from './resolvers';
import { getContext } from './context';
import { shallowMerge } from '../utils/shallowMerge';

/*
 * Define the ApolloServerExpressConfig here, which includes the 
 * schema (make up of typeDefs and resolvers), and the context 
 */

/* ***** SCHEMA ***** */
const resolvers = shallowMerge([userResolvers, dateResolvers]);
const typeDefs = [rootTypeDefs, userTypeDefs, dateTypeDefs];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

/* ***** CONTEXT ***** */
const context = getContext({ UserService });

/* ***** ApolloServerExpressConfig ***** */
export const config = {
  schema,
  context
}