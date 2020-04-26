import gql from 'graphql-tag';
import { TRIP_FIELDS } from './trip';

export const LOGGED_IN_DATA_QUERY = gql`
  query GetLoggedInUser {
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

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password)
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password)
  }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input)
  }
`;

export const POSSIBLE_TRIP_INVITEES_QUERY = gql`
  query PossibleTripInvitees($tripId: Int!) {
    possibleTripInvitees(tripId: $tripId) {
      id
      email
    }
  }
`;
