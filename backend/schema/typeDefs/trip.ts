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
    location_address: String!
    start_date: Date!
  }

  input FindTripInput {
    id: Int
    name: String
    description: String
    location: [Float]
    location_address: String
    start_date: Date
    status: TripStatus
    created_date: Date
  }

  input UpdateTripInput {
    id: Int!
    name: String
    description: String
    location: [Float]
    location_address: String
    start_date: Date
    status: TripStatus
  }

  input CreateTripItineraryInput {
    trip_id: Int!
    name: String!
    description: String
    location: [Float]!
    location_address: String!
    start_time: Date!
  }

  input UpdateTripItineraryInput {
    id: Int
    trip_id: Int
    name: String
    description: String
    location: [Float]
    location_address: String
    start_time: Date
    end_time: Date
  }

  type Trip {
    id: Int
    name: String
    description: String
    location: [Float]
    location_address: String
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
    location_address: String
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
    updateTrip(input: UpdateTripInput): Int @isAuth
    deleteTrip(id: Int!): Int @isAuth
    createTripItinerary(input: CreateTripItineraryInput): TripItinerary @isAuth
    updateTripItinerary(input: UpdateTripItineraryInput): Int @isAuth
    deleteTripItinerary(id: Int!): Int @isAuth
  }
`;
