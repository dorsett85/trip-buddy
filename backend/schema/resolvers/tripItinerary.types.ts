import { IResolvers } from 'apollo-server-express';
import { AuthMutationFieldResolvers, AuthQueryFieldResolvers } from '../types/resolvers';

export interface TripItineraryResolvers extends IResolvers {
  Query: {
    tripItineraries: AuthQueryFieldResolvers['tripItineraries'];
  };
  Mutation: {
    createTripItinerary: AuthMutationFieldResolvers['createTripItinerary'];
    updateTripItinerary: AuthMutationFieldResolvers['updateTripItinerary'];
    deleteTripItinerary: AuthMutationFieldResolvers['deleteTripItinerary'];
  };
}
