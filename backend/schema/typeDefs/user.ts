import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  enum Role {
    admin
    customer
  }

  enum AcceptingTripInvites {
    no
    friends
    all
  }

  type NewUserSetup {
    email_verified: Boolean!
    username: Boolean!
    accepting_trip_invites: Boolean!
  }

  input NewUserSetupInput {
    email_verified: Boolean!
    username: Boolean!
    accepting_trip_invites: Boolean!
  }

  type User {
    id: Int!
    username: String!
    email: String!
    password: String!
    email_verified: Boolean!
    email_verification_token: String!
    role: Role!
    accepting_trip_invites: AcceptingTripInvites!
    created_date: Date!
    new_user_setup: NewUserSetup!
    trips: [Trip]
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
    accepting_trip_invites: AcceptingTripInvites
    new_user_setup: NewUserSetupInput
  }

  extend type Query {
    user: User @isAuth
    possibleTripInvitees(tripId: Int!): [User] @isAuth
  }

  extend type Mutation {
    loginUser(username: String!, password: String!): String
    registerUser(email: String!, password: String!): String
    verifyEmail(token: String!): Int @isAuth
    updateUser(input: UpdateUserInput!): Int @isAuth
  }
`;
