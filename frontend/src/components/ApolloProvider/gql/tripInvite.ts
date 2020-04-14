import { gql } from 'apollo-boost';
import {TRIP_FIELDS} from "./trip";

export const GET_TRIP_INVITES_QUERY = gql`
  query TripInvites {
    tripInvites {
      id
      trip_id
      status
      created_date
      trip {
        name
        location_address
        start_date
      }
    }
  }
`;

export const CREATE_TRIP_INVITES_MUTATION = gql`
  mutation CreateTripInvites($input: [CreateTripInviteInput]) {
    createTripInvites(input: $input)
  }
`;

export const UPDATE_TRIP_INVITE_MUTATION = gql`
  mutation UpdateTripInvite($input: UpdateTripInviteInput) {
    updateTripInvite(input: $input)
  }
`;

export const ACCEPT_TRIP_INVITE_MUTATION = gql`
  mutation AcceptTripInvite($input: UpdateTripInviteInput) {
    acceptTripInvite(input: $input) {
      ${TRIP_FIELDS}
    }
  }
`;