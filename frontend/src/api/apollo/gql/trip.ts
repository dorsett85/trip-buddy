import gql from 'graphql-tag';

export const TRIP_FIELDS_FRAGMENT = gql`
  fragment TripFields on Trip {
    id
    name
    description
    location
    location_address
    start_date
    status
    created_date
  }
`;

export const CREATE_TRIP_MUTATION = gql`
  mutation CreateTrip($input: CreateTripInput!) {
    createTrip(input: $input) {
      ...TripFields
    }
  }
  ${TRIP_FIELDS_FRAGMENT}
`;

export const UPDATE_TRIP_MUTATION = gql`
  mutation UpdateTrip($input: UpdateTripInput!) {
    updateTrip(input: $input)
  }
`;

export const DELETE_TRIP_MUTATION = gql`
  mutation DeleteTrip($id: Int!) {
    deleteTrip(id: $id)
  }
`;
