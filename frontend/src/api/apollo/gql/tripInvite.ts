import gql from 'graphql-tag';
import { TRIP_FIELDS_FRAGMENT } from './trip';

export const TRIP_INVITES_QUERY = gql`
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
  mutation CreateTripInvites($input: [CreateTripInviteInput!]!) {
    createTripInvites(input: $input)
  }
`;

export const UPDATE_TRIP_INVITE_MUTATION = gql`
  mutation UpdateTripInvite($input: UpdateTripInviteInput!) {
    updateTripInvite(input: $input)
  }
`;

export const ACCEPT_TRIP_INVITE_MUTATION = gql`
  mutation AcceptTripInvite($id: Int!) {
    acceptTripInvite(id: $id) {
      ...TripFields
    }
  }
  ${TRIP_FIELDS_FRAGMENT}
`;

export const TRIP_INVITES_ID_QUERY = gql`
  query TripInitiatedInvitesId {
    tripInvites(input: { status: initiated }) {
      id
    }
  }
`;

export const TRIP_INVITE_CREATED_SUBSCRIPTION = gql`
  subscription TripInviteCreated {
    tripInviteCreated {
      id
      status
    }
  }
`;
