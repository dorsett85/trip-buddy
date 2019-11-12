import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { ContextDeps, ContextObj } from './context.types';
import { getToken } from '../utils/getToken';

export const getContext = (dependencies: ContextDeps) => ({
  req
}: ExpressContext): ContextObj | ContextObj<true> => {
  const { UserService, TripService } = dependencies;

  // Verify user
  const token = getToken(req.headers.authorization);
  const user = token ? UserService.verify(token) : null;

  return {
    user,
    UserService: new UserService(),
    TripService: new TripService()
  };
};
