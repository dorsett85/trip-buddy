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
  const accessService = new AccessService({ userModel: new UserModel('users') });
  const user = token ? await accessService.getActiveUser(token) : null;

  // If there's no user, then don't provide additional services!
  if (!user) {
    return {
      user,
      accessService,
      userService: null,
      tripService: null,
      tripItineraryService: null
    };
  }

  // Instantiate user and trip services
  const { UserService, TripService, TripItineraryService } = services;
  const { UserTripModel, TripModel, TripItineraryModel } = models;

  const userService = new UserService({ user, userModel: new UserModel('users') });
  const tripService = new TripService({
    user,
    userTripModel: new UserTripModel('users_trips'),
    tripModel: new TripModel('trips')
  });
  const tripItineraryService = new TripItineraryService({
    user,
    tripItineraryModel: new TripItineraryModel('trip_itineraries')
  });

  return {
    user,
    accessService,
    userService,
    tripService,
    tripItineraryService
  };
};
