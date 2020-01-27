import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { ContextDeps, ContextObj } from './context.types';
import { getToken } from '../utils/getToken';

export const getContext = ({ services, models }: ContextDeps) => async ({
  req
}: ExpressContext): Promise<ContextObj | ContextObj<true>> => {
  // Verify user and get their latest data
  const token = getToken(req.headers.authorization);
  const { AccessService } = services;
  const { UserModel } = models;
  const accessService = new AccessService({ UserModel });
  const user = token ? await accessService.getActiveUser(token) : null;

  // If there's no user, then don't provide additional services!
  if (!user) {
    return {
      user,
      accessService,
      userService: null,
      tripService: null
    };
  }

  // Instantiate user and trip services
  const { UserService, TripService } = services;
  const { UserTripModel, TripModel, TripItineraryModel } = models;

  const userService = new UserService({ user, UserModel });
  const tripService = new TripService({
    user,
    UserTripModel,
    TripModel,
    TripItineraryModel
  });

  return {
    user,
    accessService,
    userService,
    tripService
  };
};
