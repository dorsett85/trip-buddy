import { gql } from 'apollo-boost';

//
// Trips
//
export const TRIP_FIELDS = `
  id
  name
  description
  location
  location_address
  start_date
  status
  created_date
`;

export const CREATE_TRIP = gql`
  mutation createTrip($input: CreateTripInput) {
    createTrip(input: $input) {
      ${TRIP_FIELDS}
    }
  }
`;

export const UPDATE_TRIP = gql`
  mutation UpdateTrip($input: UpdateTripInput) {
    updateTrip(input: $input) {
      name
      status
      start_date
      location
      location_address
    }
  }
`;

export const DELETE_TRIP = gql`
  mutation DeleteTrip($id: Int!) {
    deleteTrip(id: $id)
  }
`;

//
// Itineraries
//

export const ITINERARY_FIELDS = `
  id
  trip_id
  name
  description
  location
  location_address
  start_time
  end_time
`;

export const GET_ITINERARIES = gql`
  query GetItinerary($input: FindTripInput) {
    trip(input: $input) {
      itineraries {
        ${ITINERARY_FIELDS}
      }
    }
  }
`;

export const CREATE_ITINERARY = gql`
  mutation CreateTripItinerary($input: CreateTripItineraryInput) {
    createTripItinerary(input: $input) {
      ${ITINERARY_FIELDS}
    }
  }
`;

export const UPDATE_ITINERARY = gql`
  mutation UpdateTripItinerary($input: UpdateTripItineraryInput) {
    updateTripItinerary(input: $input) {
      ${ITINERARY_FIELDS}
    }
  }
`;

export const DELETE_ITINERARY = gql`
  mutation DeleteTripItinerary($id: Int!) {
    deleteTripItinerary(id: $id)
  }
`;
