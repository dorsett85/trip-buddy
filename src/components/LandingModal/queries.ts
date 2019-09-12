import { gql } from 'apollo-boost';

export const GET_USER = gql`
  {
    getUsers {
      username
    }
  }
`;
