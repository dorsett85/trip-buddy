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

  type User {
    id: Int
    username: String
    email: String
    password: String
    email_validated: Boolean
    role: Role
    accepting_trip_invites: AcceptingTripInvites
    created_date: Date
    trips: [Trip]
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
    email_validated: Boolean
    accepting_trip_invites: AcceptingTripInvites
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