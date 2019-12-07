/* eslint-disable camelcase */
import { IResolvers } from 'apollo-server-express';
// eslint-disable-next-line import/no-cycle
import { InputResolverArg, AuthFieldResolver } from '../../types/resolvers';
import { TripRecord } from '../../models/Trip.types';
import { TripLegRecord } from '../../models/TripLeg.types';
import { TripLegItineraryRecord } from '../../models/TripLegItinerary.types';

export type CreateTripInput = InputResolverArg<
  Pick<TripRecord, 'name' | 'description'> & Pick<TripLegRecord, 'location' | 'date_time'>
>;

export type FindTripInput = InputResolverArg<TripSchema>;
export type UpdateTripInput = InputResolverArg<Omit<TripSchema, 'created_date'>>;
export type TripLegItineraryInput = InputResolverArg<TripLegItinerarySchema>;

export interface TripResolvers extends IResolvers {
  Trip: {
    legs: AuthFieldResolver<TripSchema, any, Promise<TripLegSchema[]>>;
  };
  TripLeg: {
    itinerary: AuthFieldResolver<
      TripLegSchema,
      TripLegItineraryInput,
      Promise<TripLegItinerarySchema[]>
    >;
  };
  Query: {
    trip: AuthFieldResolver<any, FindTripInput, Promise<TripSchema>>;
    trips: AuthFieldResolver<any, FindTripInput, Promise<TripSchema[]>>;
  };
  Mutation: {
    createTrip: AuthFieldResolver<any, CreateTripInput, Promise<TripSchema>>;
    updateTrip: AuthFieldResolver<any, UpdateTripInput, Promise<TripSchema>>;
  };
}

export interface TripSchema extends Partial<TripRecord> {}
export interface TripLegSchema extends Partial<TripLegRecord> {}
export interface TripLegItinerarySchema extends Partial<TripLegItineraryRecord> {}
