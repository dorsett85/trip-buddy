import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  extend type Query {
    user: User
    users: [User]
  }
  
  extend type Mutation {
    loginUser(username: String!, password: String!): String
    registerUser(email: String!, password: String!): String
  }

  type User {
    id: Int
    username: String
    email: String
    email_validated: Boolean
    created: Date
    trips: [Trip]
  }
`;