import { ApolloServerExpressConfig } from 'apollo-server-express';
import AccessService from '../services/Access';
import UserService from '../services/User';
import TripService from '../services/Trip';
import TripItineraryService from '../services/TripItinerary';
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
import { getFormatError } from './getFormatError';
import {ConnectQueryBuilder} from "../utils/QueryBuilder";
import db from "../db/db";

const qb = ConnectQueryBuilder(db);

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
    TripItineraryModel
  },
  db: qb
});

const formatError = getFormatError();

export const config: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  schemaDirectives,
  context,
  formatError
};
