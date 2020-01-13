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
    start_date: Date!
  }

  input FindTripInput {
    id: Int
    name: String
    description: String
    location: [Float]
    start_date: Date
    status: TripStatus
    created_date: Date
  }

  input UpdateTripInput {
    id: Int
    name: String
    description: String
    location: [Float]
    start_date: Date
    status: TripStatus
  }

  input UpdateTripItineraryInput {
    id: Int
    trip_id: Int
    name: String
    description: String
    location: [Float]
    start_time: Date
    end_time: Date
  }

  type Trip {
    id: Int
    name: String
    description: String
    location: [Float]
    start_date: Date
    status: TripStatus
    created_date: Date
    itineraries: [TripItinerary]
  }

  type TripItinerary {
    id: Int
    trip_id: Int
    name: String
    description: String
    location: [Float]
    start_time: Date
    end_time: Date
    created_date: Date
  }
  
  extend type Query {
    trip(input: FindTripInput): Trip @isAuth
    trips(input: FindTripInput): [Trip] @isAuth
  }

  extend type Mutation {
    createTrip(input: CreateTripInput): Trip @isAuth
    updateTrip(input: UpdateTripInput): Trip @isAuth
    deleteTrip(id: Int!): Int @isAuth 
    updateTripItinerary(input: UpdateTripItineraryInput): TripItinerary @isAuth
  }
`;