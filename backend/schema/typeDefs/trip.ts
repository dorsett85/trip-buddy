import { gql } from 'apollo-server-express';

export const tripTypeDefs = gql`
  enum TripStatus {
    pending
    confirmed
    active
    completed
    cancelled
  }

  input CreateTripInput {
    name: String!
    description: String
    location: [Float]!
    date_time: Date!
  }

  input FindTripInput {
    id: Int
    name: String
    description: String
    status: TripStatus
    created_date: Date
  }

  input UpdateTripInput {
    id: Int
    name: String
    description: String
    status: TripStatus
  }

  input TripLegInput {
    id: Int
    trip_id: Int
    name: String
    description: String
    location: [Float]
    date_time: Date
    created_date: Date
  }

  input TripLegItineraryInput {
    id: Int
    trip_leg_id: Int
    description: String
    start_time: Date
    end_time: Date
    created_date: Date
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
  
  extend type Query {
    trip(input: FindTripInput): Trip @isAuth
    trips: [Trip] @isAuth
  }

  extend type Mutation {
    createTrip(input: CreateTripInput): Trip @isAuth
    updateTrip(input: UpdateTripInput): Trip @isAuth
  }
`;