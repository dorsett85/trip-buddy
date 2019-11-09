import { gql } from 'apollo-server-express';

export const tripTypeDefs = gql`
  extend type Query {
    trip: Trip
    trips: [Trip]
  }
  
  extend type Mutation {
    addTrip(name: String): Trip
    editTrip(name: String): Trip
  }

  type Trip {
    id: Int
    name: String
    start_location: [Float]
    end_location: [Float]
    start_date: Date
    end_date: Date
    created_date: Date
  }
`;