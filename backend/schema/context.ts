import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { ContextDeps, ContextObj } from './context.types';
import { getToken } from '../utils/getToken';

export const getContext = (dependencies: ContextDeps) => ({
  req
}: ExpressContext): ContextObj => {
  const { UserService } = dependencies;
  const us = new UserService();

  // Verify user
  const token = getToken(req.headers.authorization);
  const user = token ? us.verify(token) : null;

  return {
    UserService: us,
    user
  };
};
