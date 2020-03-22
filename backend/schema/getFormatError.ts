import { GraphQLError } from 'graphql';
import { env } from '../config/config';
import {
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE
} from '../utils/constants/errors';

/**
 * This function allows custom handling for all graphql server errors
 */
export const getFormatError = (/* ADD DEPENDENCIES AS NEEDED */) => (
  err: GraphQLError
): GraphQLError => {
  const formattedErr = err;
  const { extensions } = err;

  if (extensions) {
    console.log(err);
    console.log('\n', extensions.exception.stacktrace.join('\n'));

    // Define production overrides for errors sent to the client
    if (env === 'production') {
      if (extensions.code === INTERNAL_SERVER_ERROR) {
        formattedErr.message = INTERNAL_SERVER_ERROR_MESSAGE;
      }

      delete extensions.exception;
    }
  }

  return formattedErr;
};
