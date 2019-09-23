import { makeExecutableSchema } from 'apollo-server-express';
import { rootTypeDefs, userTypeDefs } from './typeDefs';
import { userResolvers } from './resolvers';
import UserService from '../services/User';

// Inject resolver dependencies
const userResolversWithDeps = userResolvers({
  UserService
});

const typeDefs = [rootTypeDefs, userTypeDefs]
const resolvers =  [userResolversWithDeps]

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
