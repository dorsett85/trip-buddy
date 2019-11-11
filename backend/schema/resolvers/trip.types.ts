/* eslint-disable camelcase */
import { IResolvers } from 'apollo-server-express';
// eslint-disable-next-line import/no-cycle
import { ContextFieldResolver } from '../../types/resolvers';
import { LngLatArray } from '../../types';

export interface CreateTripInput {
  input: {
    name: string;
    start_date: Date;
    end_date: Date;
    start_location: LngLatArray;
  }
}

export interface TripResolvers extends IResolvers {
  Query: {
    trip: ContextFieldResolver<any, TripSchema>;
    trips: ContextFieldResolver<any, TripSchema[]>;
  };
  Mutation: {
    createTrip: ContextFieldResolver<CreateTripInput, Promise<TripSchema>>;
  }
}

export interface TripSchema {
  id?: number;
  name?: string;
  start_date?: Date;
  end_date?: Date;
  start_location?: LngLatArray;
  created_date?: Date;
}
