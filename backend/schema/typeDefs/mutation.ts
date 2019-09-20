import { GraphQLObjectType, GraphQLString } from 'graphql';
import { userType } from './user';
import { dummyUser } from '../resolvers/user';

export const mutationType = (resolvers: any) => {
  return new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      loginUser: {
        type: userType,
        args: {
          username: { type: GraphQLString },
          password: { type: GraphQLString },
          email: { type: GraphQLString }
        },
        resolve: resolvers.user.loginUser
      },
      registerUser: {
        type: userType,
        args: {
          username: { type: GraphQLString },
          password: { type: GraphQLString },
          email: { type: GraphQLString }
        },
        resolve: () => dummyUser
      }
    }
  });
};
