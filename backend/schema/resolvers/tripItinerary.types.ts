import { IResolvers } from 'apollo-server-express';
import {
  PartialTripItineraryRecord,
  TripItineraryRecord
} from 'common/lib/types/tripItinerary';
import { InputArgs } from 'common/lib/types/gqlSchema/inputArgs';
import {
  CreateTripItineraryInputArgs,
  UpdateTripItineraryInputArgs
} from 'common/lib/types/gqlSchema/tripItinerary';
import { AuthFieldResolver } from '../types/resolvers';

export interface TripItineraryResolvers extends IResolvers {
  Query: {
    tripItineraries: AuthFieldResolver<
      any,
      InputArgs<PartialTripItineraryRecord>,
      Promise<TripItineraryRecord[]>
    >;
  };
  Mutation: {
    createTripItinerary: AuthFieldResolver<
      any,
      CreateTripItineraryInputArgs,
      Promise<TripItineraryRecord>
    >;
    updateTripItinerary: AuthFieldResolver<
      any,
      UpdateTripItineraryInputArgs,
      Promise<TripItineraryRecord['id']>
    >;
    deleteTripItinerary: AuthFieldResolver<
      any,
      Pick<TripItineraryRecord, 'id'>,
      Promise<TripItineraryRecord['id']>
    >;
  };
}
