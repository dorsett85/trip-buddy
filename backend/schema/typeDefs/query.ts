import { GraphQLObjectType, GraphQLID } from 'graphql';
import { dummyUser } from '../resolvers/user';
import { userType } from './user';

export const queryType = (resolvers = {}) => {
  return new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: GraphQLID }
        },
        resolve: () => dummyUser
      }
    }
  });
};
