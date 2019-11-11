import { gql } from 'apollo-server-express';

export const tripTypeDefs = gql`
  extend type Query {
    trip: Trip
    trips: [Trip]
  }

  input CreateTripInput {
    name: String
    start_location: [Float]
    start_date: Date
    end_date: Date
  }
  
  extend type Mutation {
    createTrip(input: CreateTripInput): Trip
    editTrip(name: String): Trip
  }

  type Trip {
    id: Int
    name: String
    start_date: Date
    end_date: Date
    start_location: [Float]
    created_date: Date
  }
`;