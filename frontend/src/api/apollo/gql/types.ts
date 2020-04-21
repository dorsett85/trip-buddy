/**
 * All gql object queries return a __typename property that we need to
 * account for when handling data returned from the server.
 */
export interface GQLTypename {
  __typename: string;
}
