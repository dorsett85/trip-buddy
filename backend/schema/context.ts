import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { ContextDeps, ContextObj } from './context.types';
import { getToken } from '../utils/getToken';

export const getContext = (dependencies: ContextDeps) => async ({
  req
}: ExpressContext): Promise<ContextObj | ContextObj<true>> => {
  // Verify user
  const token = getToken(req.headers.authorization);
  let user = token ? dependencies.UserService.verify(token) : null;

  // Instantiate user and trip services
  const UserService = new dependencies.UserService();
  const TripService = new dependencies.TripService();

  // Get the user record for the context if verified
  user = user && ((await UserService.findOne({ id: user.id })) || null);

  return {
    user,
    UserService,
    TripService
  };
};
