/* eslint-disable camelcase */
import { IResolvers } from 'apollo-server-express';
import { TripRecord } from 'common/lib/types/trip';
import { TripItineraryRecord } from 'common/lib/types/tripItinerary';
import { AuthFieldResolver } from '../types/resolvers';
import { CreateTripInput, FindTripInput, UpdateTripInput } from '../../types/trip';
import {CreateTripItineraryInput, UpdateTripItineraryInput} from "../../types/tripItinerary";

export interface TripResolvers extends IResolvers {
  Trip: {
    itineraries: AuthFieldResolver<TripRecord, any, Promise<TripItineraryRecord[]>>;
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
