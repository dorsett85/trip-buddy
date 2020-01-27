import { ApolloServerExpressConfig } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import AccessService from '../services/Access';
import UserService from '../services/User';
import TripService from '../services/Trip';
import {
  rootTypeDefs,
  directivesTypeDefs,
  userTypeDefs,
  dateTypeDefs,
  tripTypeDefs
} from './typeDefs';
import { userResolvers, dateResolvers, tripResolvers } from './resolvers';
import { getContext } from './context';
import { shallowMerge } from '../utils/shallowMerge';
import {
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE
} from '../utils/constants/errors';
import { env } from '../config/config';
import { IsAuthDirective } from './directives/IsAuthDirective';
import UserModel from '../models/User';
import TripModel from '../models/Trip';
import UserTripModel from '../models/UserTrip';
import TripItineraryModel from '../models/TripItinerary';

/*
 * Define the ApolloServerExpressConfig here, which includes the
 * schema (make up of typeDefs and resolvers), directives, and the context
 */

const typeDefs = [
  rootTypeDefs,
  directivesTypeDefs,
  userTypeDefs,
  dateTypeDefs,
  tripTypeDefs
];
const resolvers = shallowMerge([userResolvers, tripResolvers, dateResolvers]);
const schemaDirectives = {
  isAuth: IsAuthDirective
};
const context = getContext({
  services: {
    AccessService,
    UserService,
    TripService
  },
  models: {
    UserModel,
    UserTripModel,
    TripModel,
    TripItineraryModel
  }
});

const formatError = (err: GraphQLError): GraphQLError => {
  const formattedErr = err;
  const { extensions } = err;

  if (extensions) {
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

export const config: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  schemaDirectives,
  context,
  formatError
};
