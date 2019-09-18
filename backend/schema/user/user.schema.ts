import { gql } from 'apollo-server-express';

export const userSchema = gql`
  extend type Query {
    user: User
    users: [User]
  }

  extend type Mutation {
    loginUser(username: String!, password: String!, email: String!): User
    registerUser(username: String!, password: String!, email: String!): User
  }

  type User {
    id: ID!
    username: String!
    password: String
    email: String!
    email_validated: Boolean!
    created: String!
  }
`;
