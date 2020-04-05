import { gql } from 'apollo-server-express';

export const tripInviteTypeDefs = gql`
  enum TripInviteStatus {
    initiated
    notified
    accepted
    declined
  }
  
  input CreateTripInvite {
    trip_id: Int!
    invitee_id: Int
    invitee_email: String!
  }
  
  type TripInvite {
    id: Int
    trip_id: Int
    inviter_id: Int
    invitee_id: Int
    invitee_email: String
    status: TripInviteStatus
    created_date: Date
    trip: Trip
  }

  extend type Query {
    tripInvites: [TripInvite] @isAuth
  }

  extend type Mutation {
    createTripInvites(input: [CreateTripInvite]): [Int] @isAuth
  }
`;
