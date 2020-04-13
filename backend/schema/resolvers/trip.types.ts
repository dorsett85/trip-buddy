import { IResolvers } from 'apollo-server-express';
import { TripRecord } from 'common/lib/types/trip';
import { AuthFieldResolver, InputResolverArg } from '../types/resolvers';
import { CreateTripArgs, PartialTripRecord, UpdateTripArgs } from '../../types/trip';

export interface TripResolvers extends IResolvers {
  Query: {
    trip: AuthFieldResolver<
      any,
      InputResolverArg<PartialTripRecord>,
      Promise<TripRecord>
    >;
    trips: AuthFieldResolver<
      any,
      InputResolverArg<PartialTripRecord>,
      Promise<TripRecord[]>
    >;
  };
  Mutation: {
    createTrip: AuthFieldResolver<
      any,
      InputResolverArg<CreateTripArgs>,
      Promise<TripRecord>
    >;
    updateTrip: AuthFieldResolver<
      any,
      InputResolverArg<UpdateTripArgs>,
      Promise<TripRecord['id']>
    >;
    deleteTrip: AuthFieldResolver<any, Pick<TripRecord, 'id'>, Promise<TripRecord['id']>>;
  };
}
