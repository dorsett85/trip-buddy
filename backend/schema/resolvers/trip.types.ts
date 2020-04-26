import { IResolvers } from 'apollo-server-express';
import { AuthMutationFieldResolvers, AuthQueryFieldResolvers } from '../types/resolvers';

export interface TripResolvers extends IResolvers {
  Query: {
    trip: AuthQueryFieldResolvers['trip'];
    trips: AuthQueryFieldResolvers['trips'];
  };
  Mutation: {
    createTrip: AuthMutationFieldResolvers['createTrip'];
    updateTrip: AuthMutationFieldResolvers['updateTrip'];
    deleteTrip: AuthMutationFieldResolvers['deleteTrip'];
  };
}
