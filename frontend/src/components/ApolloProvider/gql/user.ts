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
