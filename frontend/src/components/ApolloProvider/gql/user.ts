import { gql } from 'apollo-boost';
import { TRIP_FIELDS } from './trip';

export const GET_LOGGED_IN_DATA = gql`
  query {
    user {
      id
      username
      email
      password
      email_verified
      role
      accepting_trip_invites
      created_date
      new_user_setup {
        email_verified
        username
        accepting_trip_invites
      }
      trips {
        ${TRIP_FIELDS}
      }
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput) {
    updateUser(input: $input)
  }
`;

export const GET_POSSIBLE_TRIP_INVITEES = gql`
  query PossibleTripInvitees($tripId: Int!) {
    possibleTripInvitees(tripId: $tripId) {
      id
      email
    }
  }
`;

export const CREATE_TRIP_INVITES = gql`
  mutation CreateTripInvites($input: [CreateTripInvite]) {
    createTripInvites(input: $input)
  }
`;
