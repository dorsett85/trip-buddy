import { gql } from 'apollo-server-express';

export const directivesTypeDefs = gql`
  # Add defaults to the root schema
  directive @isAuth on FIELD_DEFINITION
`;
