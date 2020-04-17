import { ApolloError } from 'apollo-client';
import { INTERNAL_SERVER_ERROR_MESSAGE } from './constants/errors';

/**
 * Get all graphqlQLErrors
 *
 * Loop through the graphqlQlErrors property and return an array of error messages,
 * otherwise return an array of length 1 containing an internal server error message
 */
export const getErrors = ({ graphQLErrors }: ApolloError): string[] => {
  const errors = graphQLErrors.map(error => error.message);
  return errors.length ? errors : [INTERNAL_SERVER_ERROR_MESSAGE];
};

/**
 * Get first graphQLError
 *
 * Return the first graphQLError if there is one, otherwise return an
 * INTERNAL_SERVER_ERROR_MESSAGE (which would mean there was a networkError).
 *
 * This should ONLY be used for single query graphql requests because they
 * will only contain a single graphQLError.
 */
export const getFirstError = (error: ApolloError | Error): string => {
  return error instanceof ApolloError ? getErrors(error)[0] : error.message;
};
