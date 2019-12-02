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

export type TripInput = InputResolverArg<Partial<TripRecord>>;
export type TripLegItineraryInput = InputResolverArg<Partial<TripLegItineraryRecord>>;

export interface TripResolvers extends IResolvers {
  Trip: {
    legs: AuthFieldResolver<TripSchema, any, Promise<TripLegSchema[]>>;
  };
  Query: {
    trips: AuthFieldResolver<any, any, Promise<TripSchema[]>>;
    itinerary: AuthFieldResolver<
      any,
      TripLegItineraryInput,
      Promise<TripLegItinerarySchema[]>
    >;
  };
  Mutation: {
    createTrip: AuthFieldResolver<any, CreateTripInput, Promise<TripSchema>>;
    updateTrip: AuthFieldResolver<any, TripInput, Promise<TripSchema>>;
  };
}

export interface TripSchema extends Partial<TripRecord> {}
export interface TripLegSchema extends Partial<TripLegRecord> {}
export interface TripLegItinerarySchema extends Partial<TripLegItineraryRecord> {}
