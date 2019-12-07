import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  enum UserRole {
    admin
    customer
  }

  type User {
    id: Int
    username: String
    email: String
    password: String
    email_validated: Boolean
    role: UserRole
    created_date: Date
    trips: [Trip]
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
    email_validated: Boolean
  }
  
  extend type Query {
    user: User @isAuth
  }

  extend type Mutation {
    loginUser(username: String!, password: String!): String
    registerUser(email: String!, password: String!): String
    updateUser(input: UpdateUserInput): User @isAuth
  }
`;