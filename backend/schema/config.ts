import { ApolloServerExpressConfig } from 'apollo-server-express';
import * as ServicesMod from '../services';
import * as ModelsMod from '../models';
import * as typeDefsMod from './typeDefs'
import * as resolversMod from './resolvers';
import { getContext } from './getContext';
import { shallowMerge } from '../utils/shallowMerge';
import { IsAuthDirective } from './directives/IsAuthDirective';
import { getFormatError } from './getFormatError';

/*
 * Define the ApolloServerExpressConfig here, which includes the
 * schema (make up of typeDefs, resolvers, and subscriptions), directives, and the context
 */

const typeDefs = Object.values(typeDefsMod);

const resolvers = shallowMerge(Object.values(resolversMod));

const subscriptions = {
  path: '/graphql/ws'
}

const schemaDirectives = {
  isAuth: IsAuthDirective
};

const context = getContext({
  services: ServicesMod,
  models: ModelsMod
});

const formatError = getFormatError();

export const config: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  subscriptions,
  schemaDirectives,
  context,
  formatError
};
