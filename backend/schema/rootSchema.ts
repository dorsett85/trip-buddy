import { gql } from 'apollo-server-express';

export const rootSchema = gql`
  # Add defaults to the base schema
  type Query {
    default: Boolean
  }
  type Mutation {
    default: Boolean
  }
  type Subscription {
    default: Boolean
  }
`;