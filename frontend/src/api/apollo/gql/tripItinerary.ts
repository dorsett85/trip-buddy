import gql from 'graphql-tag';

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

export const TRIP_ITINERARIES_QUERY = gql`
  query GetItinerary($input: FindTripItineraryInput) {
    tripItineraries(input: $input) {
      ${ITINERARY_FIELDS}
    }
  }
`;

export const CREATE_TRIP_ITINERARY_MUTATION = gql`
  mutation CreateTripItinerary($input: CreateTripItineraryInput) {
    createTripItinerary(input: $input) {
      ${ITINERARY_FIELDS}
    }
  }
`;

export const UPDATE_TRIP_ITINERARY_MUTATION = gql`
  mutation UpdateTripItinerary($input: UpdateTripItineraryInput) {
    updateTripItinerary(input: $input)
  }
`;

export const DELETE_TRIP_ITINERARY_MUTATION = gql`
  mutation DeleteTripItinerary($id: Int!) {
    deleteTripItinerary(id: $id)
  }
`;
