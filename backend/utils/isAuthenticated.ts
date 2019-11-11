import { AuthenticationError } from 'apollo-server-express';
import { IsAuthenticatedResolver } from '../types/resolvers';
import { AUTHENTICATED_ERROR_MESSAGE } from './constants/errors';

export const isAuthenticated: IsAuthenticatedResolver = next => (
  source,
  args,
  context,
  info
) => {
  if (!context.user) {
    throw new AuthenticationError(AUTHENTICATED_ERROR_MESSAGE);
  }

  return next(source, args, context, info);
};
