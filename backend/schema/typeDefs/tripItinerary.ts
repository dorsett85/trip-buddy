import { gql } from 'apollo-server-express';

export const tripItineraryTypeDefs = gql`
  input CreateTripItineraryInput {
    trip_id: Int!
    name: String!
    description: String
    location: [Float]!
    location_address: String!
    start_time: Date!
  }
  
  input FindTripItineraryInput {
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
    tripItineraries(input: FindTripItineraryInput): [TripItinerary] @isAuth
  }

  extend type Mutation {
    createTripItinerary(input: CreateTripItineraryInput): TripItinerary @isAuth
    updateTripItinerary(input: UpdateTripItineraryInput): Int @isAuth
    deleteTripItinerary(id: Int!): Int @isAuth
  }
`;
