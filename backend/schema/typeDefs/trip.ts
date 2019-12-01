import { gql } from 'apollo-server-express';

export const tripTypeDefs = gql`
  extend type Query {
    trip: Trip @isAuth
    trips: [Trip] @isAuth
  }

  input CreateTripInput {
    name: String!
    description: String
    location: [Float]!
    date_time: Date!
  }

  input UpdateTripInput {
    id: Int!
    name: String
    description: String
    status: TripStatus
    created_date: Date
  }
  
  extend type Mutation {
    createTrip(input: CreateTripInput): Trip @isAuth
    updateTrip(input: UpdateTripInput): Trip @isAuth
  }

  enum TripStatus {
    pending
    confirmed
    active
    completed
    cancelled
  }

  type Trip {
    id: Int
    name: String
    description: String
    status: TripStatus
    created_date: Date
    legs: [TripLeg]
  }

  type TripLeg {
    id: Int
    trip_id: Int
    name: String
    description: String
    location: [Float]
    date_time: Date
    created_date: Date
    itinerary: [TripLegItinerary]
  }

  type TripLegItinerary {
    id: Int
    trip_leg_id: Int
    description: String
    start_time: Date
    end_time: Date
    created_date: Date
  }
`;