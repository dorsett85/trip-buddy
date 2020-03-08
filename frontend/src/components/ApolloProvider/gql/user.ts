import { gql } from 'apollo-boost';
import { TRIP_FIELDS } from './trip';

//
// User
//

export const GET_LOGGED_IN_DATA = gql`
  query {
    user {
      id
      username
      email
      password
      email_validated
      role
      accepting_trip_invites
      created_date
      trips {
        ${TRIP_FIELDS}
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput) {
    updateUser(input: $input)
  }
`;

export const TRIP_INVITE_USERS = gql`
  query {
    tripInviteUsers {
      email
    }
  }
`;
