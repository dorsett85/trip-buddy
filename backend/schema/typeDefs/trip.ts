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

  type Trip {
    id: Int
    name: String
    description: String
    location: [Float]
    location_address: String
    start_date: Date
    status: TripStatus
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
  }
`;
