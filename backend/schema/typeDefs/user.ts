import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    email_validated: { type: GraphQLString },
    created: { type: GraphQLDateTime }
  }
});
