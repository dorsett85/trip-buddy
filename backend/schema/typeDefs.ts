import { gql} from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    getUsers: [User]
  }

  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    email_validated: Boolean! 
    created: String! 
  }
`;
