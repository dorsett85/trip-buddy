import { GraphQLObjectType, GraphQLBoolean } from 'graphql';

export const subscriptionType = (resolvers = {}) => {
  return new GraphQLObjectType({
    name: 'Subscription',
    fields: {
      default: {
        type: GraphQLBoolean,
        resolve: () => true
      }
    }
  });
};
