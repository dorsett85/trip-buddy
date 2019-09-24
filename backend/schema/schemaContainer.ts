import { makeExecutableSchema } from 'apollo-server-express';
import { rootTypeDefs, userTypeDefs, dateTypeDefs } from './typeDefs';
import { userResolvers, dateResolvers } from './resolvers';
import UserService from '../services/User';

// Inject resolver dependencies
const userResolversWithDeps = userResolvers({
  UserService
});

// Create interfaces and function to Merge resolvers
interface Resolver {
  [key: string]: any;
}
interface ResolverAccumulator {
  [key: string]: Resolver;
}
const resolverAccumulator: ResolverAccumulator = {};
export const mergeResolvers = (resolverList: Resolver[]) => {
  return resolverList.reduce((acc: ResolverAccumulator, resolver: Resolver) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(resolver)) {
      // Add property if it doesn't exist, otherwise combine new properties
      acc[key] = !acc[key] ? resolver[key] : { ...acc[key], ...resolver[key] };
    }
    return acc;
  }, resolverAccumulator);
};

const resolvers = mergeResolvers([userResolversWithDeps, dateResolvers]);
const typeDefs = [rootTypeDefs, userTypeDefs, dateTypeDefs];

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
