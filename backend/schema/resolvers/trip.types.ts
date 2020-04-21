import { IResolvers } from 'apollo-server-express';
import { PartialTripRecord, TripRecord } from 'common/lib/types/trip';
import { InputArgs } from 'common/lib/types/gqlSchema/inputArgs';
import {
  CreateTripInputArgs,
  UpdateTripInputArgs
} from 'common/lib/types/gqlSchema/trip';
import { AuthFieldResolver } from '../types/resolvers';

export interface TripResolvers extends IResolvers {
  Query: {
    trip: AuthFieldResolver<any, InputArgs<PartialTripRecord>, Promise<TripRecord>>;
    trips: AuthFieldResolver<any, InputArgs<PartialTripRecord>, Promise<TripRecord[]>>;
  };
  Mutation: {
    createTrip: AuthFieldResolver<any, CreateTripInputArgs, Promise<TripRecord>>;
    updateTrip: AuthFieldResolver<any, UpdateTripInputArgs, Promise<TripRecord['id']>>;
    deleteTrip: AuthFieldResolver<any, Pick<TripRecord, 'id'>, Promise<TripRecord['id']>>;
  };
}
