/* eslint-disable camelcase */
import { IResolvers } from 'apollo-server-express';
import { TripRecord } from 'common/lib/types/trip';
import { TripItineraryRecord } from 'common/lib/types/tripItinerary';
import { AuthFieldResolver, InputResolverArg } from '../types/resolvers';
import { CreateTripArgs, PartialTripRecord, UpdateTripArgs } from '../../types/trip';
import {
  CreateTripItineraryArgs,
  UpdateTripItineraryArgs
} from '../../types/tripItinerary';

export interface TripResolvers extends IResolvers {
  Trip: {
    itineraries: AuthFieldResolver<TripRecord, any, Promise<TripItineraryRecord[]>>;
  };
  Query: {
    trip: AuthFieldResolver<
      any,
      InputResolverArg<PartialTripRecord>,
      Promise<TripRecord>
    >;
    trips: AuthFieldResolver<
      any,
      InputResolverArg<PartialTripRecord>,
      Promise<TripRecord[]>
    >;
  };
  Mutation: {
    createTrip: AuthFieldResolver<
      any,
      InputResolverArg<CreateTripArgs>,
      Promise<TripRecord>
    >;
    updateTrip: AuthFieldResolver<
      any,
      InputResolverArg<UpdateTripArgs>,
      Promise<TripRecord['id']>
    >;
    deleteTrip: AuthFieldResolver<any, Pick<TripRecord, 'id'>, Promise<TripRecord['id']>>;
    createTripItinerary: AuthFieldResolver<
      any,
      InputResolverArg<CreateTripItineraryArgs>,
      Promise<TripItineraryRecord>
    >;
    updateTripItinerary: AuthFieldResolver<
      any,
      InputResolverArg<UpdateTripItineraryArgs>,
      Promise<TripItineraryRecord['id']>
    >;
    deleteTripItinerary: AuthFieldResolver<
      any,
      Pick<TripItineraryRecord, 'id'>,
      Promise<TripItineraryRecord['id']>
    >;
  };
}
