import gql from 'graphql-tag';

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

export const CREATE_TRIP_MUTATION = gql`
  mutation createTrip($input: CreateTripInput!) {
    createTrip(input: $input) {
      ${TRIP_FIELDS}
    }
  }
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
