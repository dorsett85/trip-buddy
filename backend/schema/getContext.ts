import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { PubSub } from 'apollo-server-express';
import { ContextObj } from './types/contextObj';
import { ContextDeps } from './types/contextDeps';
import { getToken } from '../utils/getToken';
import { expressServer } from '../config/config';
import db from '../db/db';
import { connectQueryBuilder } from '../utils/QueryBuilder';

export const pubsub = new PubSub();

const qb = connectQueryBuilder(db);
const { jwtSecretKey } = expressServer;

/**
 * Function to get the graphql context. This is run every time a new api request is made.
 * Context dependencies can be added to the ContextDeps object, and these dependencies can
 * then be injected into our different services and models.
 */
export const getContext = ({ services, models }: ContextDeps) => async ({
  req,
  connection
}: ExpressContext): Promise<ContextObj | ContextObj<true>> => {
  // Get the authorization token from either an http request or ws connection
  const { authorization } = req?.headers || connection?.context;

  // Verify user and get their latest data
  const token = getToken(authorization);
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
      accessService,
      user,
      pubsub: null,
      userService: null,
      tripService: null,
      tripItineraryService: null,
      tripInviteService: null
    };
  }

  // Instantiate all other services and models for a logged in user
  const { UserService, TripService, TripItineraryService, TripInviteService } = services;
  const { UserTripModel, TripModel, TripItineraryModel, TripInviteModel } = models;

  const userService = new UserService({ user, userModel: new UserModel('users', qb) });
  const tripService = new TripService({
    user,
    tripModel: new TripModel('trips', qb),
    userTripModel: new UserTripModel('users_trips', qb)
  });
  const tripItineraryService = new TripItineraryService({
    user,
    tripItineraryModel: new TripItineraryModel('trip_itineraries', qb)
  });
  const tripInviteService = new TripInviteService({
    user,
    pubsub,
    tripInviteModel: new TripInviteModel('trip_invites', qb)
  });

  return {
    accessService,
    user,
    pubsub,
    userService,
    tripService,
    tripItineraryService,
    tripInviteService
  };
};
