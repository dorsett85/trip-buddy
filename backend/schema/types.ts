import { GraphQLObjectType, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    email_validated: { type: GraphQLString },
    created: { type: GraphQLString }
  }
});
