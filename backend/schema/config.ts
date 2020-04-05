import { ApolloServerExpressConfig } from 'apollo-server-express';
import AccessService from '../services/AccessService';
import UserService from '../services/UserService';
import TripService from '../services/TripService';
import TripItineraryService from '../services/TripItineraryService';
import {
  rootTypeDefs,
  directivesTypeDefs,
  userTypeDefs,
  dateTypeDefs,
  tripTypeDefs
} from './typeDefs';
import { userResolvers, dateResolvers, tripResolvers } from './resolvers';
import { getContext } from './getContext';
import { shallowMerge } from '../utils/shallowMerge';
import { IsAuthDirective } from './directives/IsAuthDirective';
import UserModel from '../models/UserModel';
import TripModel from '../models/TripModel';
import UserTripModel from '../models/UserTripModel';
import TripItineraryModel from '../models/TripItineraryModel';
import TripInviteModel from '../models/TripInviteModel';
import { getFormatError } from './getFormatError';

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
    TripService,
    TripItineraryService
  },
  models: {
    UserModel,
    UserTripModel,
    TripModel,
    TripItineraryModel,
    TripInviteModel
  }
});

const formatError = getFormatError();

export const config: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  schemaDirectives,
  context,
  formatError
};
