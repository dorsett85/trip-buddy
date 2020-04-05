import { gql } from 'apollo-boost';

export const GET_TRIP_INVITES_QUERY = gql`
  query TripInvites {
    tripInvites {
      id
      status
      created_date
      trip {
        name
        location_address
        start_date
        status
      }
    }
  }
`;

export const CREATE_TRIP_INVITES_MUTATION = gql`
  mutation CreateTripInvites($input: [CreateTripInvite]) {
    createTripInvites(input: $input)
  }
`;