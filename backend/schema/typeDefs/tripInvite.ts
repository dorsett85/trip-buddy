import { gql } from 'apollo-server-express';

export const tripInviteTypeDefs = gql`
  enum TripInviteStatus {
    initiated
    notified
    accepted
    declined
  }

  input CreateTripInviteInput {
    trip_id: Int!
    invitee_id: Int
    invitee_email: String!
  }
  
  input FindTripInviteInput {
    id: Int
    trip_id: Int
    inviter_id: Int
    invitee_id: Int
    invitee_email: String
    status: TripInviteStatus
    created_date: Date
  }

  input UpdateTripInviteInput {
    id: Int!
    status: TripInviteStatus
  }

  type TripInvite {
    id: Int!
    trip_id: Int!
    inviter_id: Int!
    invitee_id: Int
    invitee_email: String!
    status: TripInviteStatus!
    created_date: Date!
    trip: Trip
  }

  extend type Query {
    tripInvites(input: FindTripInviteInput): [TripInvite!]! @isAuth
  }

  extend type Mutation {
    createTripInvites(input: [CreateTripInviteInput!]!): [Int!]! @isAuth
    updateTripInvite(input: UpdateTripInviteInput!): Int! @isAuth
    acceptTripInvite(id: Int!): Trip! @isAuth
  }

  extend type Subscription {
    tripInviteCreated: TripInvite! @isAuth
  }
`;
