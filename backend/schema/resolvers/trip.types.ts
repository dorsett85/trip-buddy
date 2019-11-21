/* eslint-disable camelcase */
import { IResolvers } from 'apollo-server-express';
// eslint-disable-next-line import/no-cycle
import { ContextAuthFieldResolver } from '../../types/resolvers';
import { TripRecord } from '../../models/Trip.types';
import { TripLegRecord } from '../../models/TripLeg.types';
import { TripLegItineraryRecord } from '../../models/TripLegItinerary.types';

export interface CreateTripInput {
  input: {
    name: TripRecord['name'];
    date_time: TripLegRecord['date_time'];
    location: TripLegRecord['location'];
  };
}

export interface TripResolvers extends IResolvers {
  Trip: {
    legs: ContextAuthFieldResolver<any, Promise<TripLegSchema[]>>;
  };
  Query: {
    trip: ContextAuthFieldResolver<any, Promise<TripSchema>>;
    trips: ContextAuthFieldResolver<any, Promise<TripSchema[]>>;
  };
  Mutation: {
    createTrip: ContextAuthFieldResolver<CreateTripInput, Promise<TripSchema>>;
  };
}

export interface TripSchema extends Partial<TripRecord> {
  legs?: TripLegSchema[];
}

export interface TripLegSchema extends Partial<TripLegRecord> {
  itinerary?: Partial<TripLegItineraryRecord>;
}
