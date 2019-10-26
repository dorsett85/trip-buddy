import { ApolloServerExpressConfig } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import UserService from '../services/User';
import TripService from '../services/Trip';
import { rootTypeDefs, userTypeDefs, dateTypeDefs, tripTypeDefs } from './typeDefs';
import { userResolvers, dateResolvers, tripResolvers } from './resolvers';
import { getContext } from './context';
import { shallowMerge } from '../utils/shallowMerge';
import {
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE
} from '../utils/constants/errors';
import { env } from '../config/config';

/*
 * Define the ApolloServerExpressConfig here, which includes the
 * schema (make up of typeDefs and resolvers), and the context
 */

const typeDefs = [rootTypeDefs, userTypeDefs, dateTypeDefs, tripTypeDefs];
const resolvers = shallowMerge([userResolvers, tripResolvers, dateResolvers]);
const context = getContext({ UserService, TripService });

const formatError = (err: GraphQLError) => {
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
  context,
  formatError
};
