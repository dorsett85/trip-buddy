import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { ContextObj } from './types/contextObj';
import { ContextDeps } from './types/contextDeps';
import { getToken } from '../utils/getToken';
import { expressServer } from '../config/config';
import db from '../db/db';
import { connectQueryBuilder } from '../utils/QueryBuilder';

const qb = connectQueryBuilder(db);
const { jwtSecretKey } = expressServer;

/**
 * Function to get the graphql context. This is run every time a new api request is made.
 * Context dependencies can be added to the ContextDeps object, and these dependencies can
 * then be injected into our different services and models.
 */
export const getContext = ({ services, models }: ContextDeps) => async ({
  req
}: ExpressContext): Promise<ContextObj | ContextObj<true>> => {
  // Verify user and get their latest data
  const token = getToken(req.headers.authorization);
  const { AccessService } = services;
  const { UserModel } = models;
  const accessService = new AccessService({
    userModel: new UserModel('users', qb),
    jwtSecretKey
  });
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
  const { UserTripModel, TripModel, TripItineraryModel, TripInviteModel } = models;

  const userService = new UserService({ user, userModel: new UserModel('users', qb) });
  const tripService = new TripService({
    user,
    tripModel: new TripModel('trips', qb),
    userTripModel: new UserTripModel('users_trips', qb),
    tripInviteModel: new  TripInviteModel('trip_invites', qb)
  });
  const tripItineraryService = new TripItineraryService({
    user,
    tripItineraryModel: new TripItineraryModel('trip_itineraries', qb)
  });

  return {
    user,
    accessService,
    userService,
    tripService,
    tripItineraryService
  };
};
