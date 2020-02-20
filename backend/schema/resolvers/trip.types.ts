/* eslint-disable camelcase */
import { IResolvers } from 'apollo-server-express';
import { TripRecord } from 'common/lib/types/trip';
import { TripItineraryRecord } from 'common/lib/types/tripItinerary';
// eslint-disable-next-line import/no-cycle
import { InputResolverArg, AuthFieldResolver } from '../../types/resolvers';
import { OmitCreatedDate, OmitIdCreatedDate } from '../../types';

// Trip inputs
export type CreateTripInput = InputResolverArg<
  Pick<TripRecord, 'name' | 'description' | 'location' | 'start_date'>
>;
export type FindTripInput = InputResolverArg<TripSchema>;
export type UpdateTripInput = InputResolverArg<OmitCreatedDate<TripSchemaWithId>>;

// Trip itinerary inputs
export type CreateTripItineraryInput = InputResolverArg<
  Omit<OmitIdCreatedDate<TripItineraryRecord>, 'end_time'>
>;
export type UpdateTripItineraryInput = InputResolverArg<
  OmitCreatedDate<TripItinerarySchemaWithId>
>;

export interface TripResolvers extends IResolvers {
  Trip: {
    itineraries: AuthFieldResolver<TripSchema, any, Promise<TripItineraryRecord[]>>;
  };
  Query: {
    trip: AuthFieldResolver<any, FindTripInput, Promise<TripRecord>>;
    trips: AuthFieldResolver<any, FindTripInput, Promise<TripRecord[]>>;
  };
  Mutation: {
    createTrip: AuthFieldResolver<any, CreateTripInput, Promise<TripRecord>>;
    updateTrip: AuthFieldResolver<any, UpdateTripInput, Promise<TripRecord['id']>>;
    deleteTrip: AuthFieldResolver<any, Pick<TripRecord, 'id'>, Promise<TripRecord['id']>>;
    createTripItinerary: AuthFieldResolver<
      any,
      CreateTripItineraryInput,
      Promise<TripItineraryRecord>
    >;
    updateTripItinerary: AuthFieldResolver<
      any,
      UpdateTripItineraryInput,
      Promise<TripItineraryRecord['id']>
    >;
    deleteTripItinerary: AuthFieldResolver<
      any,
      Pick<TripItineraryRecord, 'id'>,
      Promise<TripItineraryRecord['id']>
    >;
  };
}

export interface TripSchema extends Partial<TripRecord> {}
export interface TripSchemaWithId extends TripSchema {
  id: TripRecord['id'];
}

export interface TripItinerarySchema extends Partial<TripItineraryRecord> {}
export interface TripItinerarySchemaWithId extends Partial<TripItineraryRecord> {
  id: TripItineraryRecord['id'];
}
