import { makeExecutableSchema } from 'apollo-server-express';
import { rootTypeDefs, userTypeDefs } from './typeDefs';
import { userResolvers } from './resolvers';

const typeDefs = [rootTypeDefs, userTypeDefs];
const resolvers = [userResolvers];

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
