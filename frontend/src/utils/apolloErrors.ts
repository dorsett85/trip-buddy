import { ApolloError } from 'apollo-boost';
import { INTERNAL_SERVER_ERROR_MESSAGE } from './constants/errors';

/**
 * Get first graphQLErrors error
 *
 * Return the first graphQLError if there is one, otherwise return an
 * INTERNAL_SERVER_ERROR_MESSAGE (which would mean there was a networkError).
 *
 * This should ONLY be used for single query graphql requests because they
 * will only contain a single graphQLError.
 */
export const getFirstError = ({ graphQLErrors }: ApolloError): string => {
  return graphQLErrors.length ? graphQLErrors[0].message : INTERNAL_SERVER_ERROR_MESSAGE;
};
