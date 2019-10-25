import { IResolvers } from 'apollo-server-express';
// eslint-disable-next-line import/no-cycle
import { ContextFieldResolver } from '../../types/resolvers';

export interface TripResolvers extends IResolvers {
  Query: {
    trip: ContextFieldResolver<any, TripSchema>;
    trips: ContextFieldResolver<any, TripSchema[]>;
  };
}

/* eslint-disable camelcase */
export interface TripSchema {
  id?: number;
  name?: string;
  start_location?: [number];
  end_location?: [number];
  start_date?: Date;
  end_date?: Date;
  created?: Date;
}
