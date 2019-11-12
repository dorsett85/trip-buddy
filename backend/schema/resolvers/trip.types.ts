/* eslint-disable camelcase */
import { IResolvers } from 'apollo-server-express';
import { ContextAuthFieldResolver } from '../../types/resolvers';
import { LngLatArray } from '../../types';
import { TripRecord } from '../../models/Trip.types';

export interface CreateTripInput {
  input: {
    name: string;
    start_date: Date;
    end_date: Date;
    start_location: LngLatArray;
  };
}

export interface TripResolvers extends IResolvers {
  Query: {
    trip: ContextAuthFieldResolver<any, Promise<TripSchema>>;
    trips: ContextAuthFieldResolver<any, Promise<TripSchema[]>>;
  };
  Mutation: {
    createTrip: ContextAuthFieldResolver<CreateTripInput, Promise<TripSchema>>;
  };
}

export interface TripSchema extends Partial<TripRecord> {}
