/* eslint-disable camelcase */
import { IResolvers } from 'apollo-server-express';
// eslint-disable-next-line import/no-cycle
import { InputResolverArg, AuthFieldResolver } from '../../types/resolvers';
import { TripRecord } from '../../models/Trip.types';
import { TripItineraryRecord } from '../../models/TripItinerary.types';

export type CreateTripInput = InputResolverArg<
  Pick<TripRecord, 'name' | 'description' | 'location' | 'start_date'>
>;

export type FindTripInput = InputResolverArg<TripSchema>;
export type UpdateTripInput = InputResolverArg<Omit<TripSchema, 'created_date'>>;

export type TripItineraryInput = InputResolverArg<TripItinerarySchema>;
export type UpdateTripItineraryInput = InputResolverArg<
  Omit<TripItinerarySchema, 'created_date'>
>;

export interface TripResolvers extends IResolvers {
  Trip: {
    itineraries: AuthFieldResolver<TripSchema, any, Promise<TripItinerarySchema[]>>;
  };
  Query: {
    trip: AuthFieldResolver<any, FindTripInput, Promise<TripSchema>>;
    trips: AuthFieldResolver<any, FindTripInput, Promise<TripSchema[]>>;
  };
  Mutation: {
    createTrip: AuthFieldResolver<any, CreateTripInput, Promise<TripSchema>>;
    updateTrip: AuthFieldResolver<any, UpdateTripInput, Promise<TripSchema>>;
    updateTripItinerary: AuthFieldResolver<
      any,
      UpdateTripItineraryInput,
      Promise<TripItinerarySchema>
    >;
  };
}

export interface TripSchema extends Partial<TripRecord> {}
export interface TripItinerarySchema extends Partial<TripItineraryRecord> {}
