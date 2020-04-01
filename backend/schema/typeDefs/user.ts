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

  type User {
    id: Int
    username: String
    email: String
    password: String
    email_verified: Boolean
    role: Role
    accepting_trip_invites: AcceptingTripInvites
    created_date: Date
    new_user_setup: NewUserSetup
    trips: [Trip]
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
    email_verified: Boolean
    accepting_trip_invites: AcceptingTripInvites
    new_user_setup: NewUserSetup
  }
  
  input CreateTripInvite {
    trip_id: Int!
    invitee_id: Int
    invitee_email: String!
  }
  
  extend type Query {
    user: User @isAuth
    possibleTripInvitees(tripId: Int!): [User] @isAuth
  }

  extend type Mutation {
    loginUser(username: String!, password: String!): String
    registerUser(email: String!, password: String!): String
    updateUser(input: UpdateUserInput): Int @isAuth
    createTripInvites(input: [CreateTripInvite]): [Int] @isAuth
  }
`;