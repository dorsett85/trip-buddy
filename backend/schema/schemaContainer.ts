import { GraphQLSchema } from 'graphql';
import { queryType, mutationType, subscriptionType } from './typeDefs';
import { userResolvers } from './resolvers';
import UserService from '../services/User';

// Inject resolver dependencies
const userResolversWithDeps = userResolvers({
  UserService
});

// Add resolvers to each root type
const query = queryType({
  user: userResolversWithDeps.Query
});
const mutation = mutationType({
  user: userResolversWithDeps.Mutation
});
const subscription = subscriptionType();

export const schema = new GraphQLSchema({ query, mutation, subscription });
