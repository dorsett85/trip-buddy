import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  extend type Query {
    user: User @isAuth
    users: [User] @isAuth
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
    email_validated: Boolean
  }
  
  extend type Mutation {
    loginUser(username: String!, password: String!): String
    registerUser(email: String!, password: String!): String
    updateUser(input: UpdateUserInput): User @isAuth
  }

  type User {
    id: Int
    username: String
    email: String
    password: String
    email_validated: Boolean
    created_date: Date
    trips: [Trip]
  }
`;