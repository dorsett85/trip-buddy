import { makeExecutableSchema } from 'apollo-server-express';
import { rootSchema } from './rootSchema';
import { userSchema, userResolvers } from './user';

const typeDefs = [rootSchema, userSchema]
const resolvers =  [userResolvers]

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});