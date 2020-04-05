import { IResolvers } from 'apollo-server-express';
import { TripItineraryRecord } from 'common/lib/types/tripItinerary';
import { AuthFieldResolver, InputResolverArg } from '../types/resolvers';
import {
  CreateTripItineraryArgs,
  PartialTripItineraryRecord,
  UpdateTripItineraryArgs
} from '../../types/tripItinerary';

export interface TripItineraryResolvers extends IResolvers {
  Query: {
    tripItineraries: AuthFieldResolver<
      any,
      InputResolverArg<PartialTripItineraryRecord>,
      Promise<TripItineraryRecord[]>
    >;
  };
  Mutation: {
    createTripItinerary: AuthFieldResolver<
      any,
      InputResolverArg<CreateTripItineraryArgs>,
      Promise<TripItineraryRecord>
    >;
    updateTripItinerary: AuthFieldResolver<
      any,
      InputResolverArg<UpdateTripItineraryArgs>,
      Promise<number>
    >;
    deleteTripItinerary: AuthFieldResolver<
      any,
      Pick<TripItineraryRecord, 'id'>,
      Promise<number>
    >;
  };
}
