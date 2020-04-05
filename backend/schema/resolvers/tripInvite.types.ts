import { IResolvers } from 'apollo-server-express';
import { TripRecord } from 'common/lib/types/trip';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { AuthFieldResolver, InputResolverArg } from '../types/resolvers';
import { CreateTripInvitesArgs } from '../../types/tripInvite';

export interface TripInviteResolvers extends IResolvers {
  TripInvite: {
    trip: AuthFieldResolver<TripInviteRecord, {}, Promise<TripRecord>>;
  };
  Query: {
    tripInvites: AuthFieldResolver<any, {}, Promise<TripInviteRecord[]>>;
  };
  Mutation: {
    createTripInvites: AuthFieldResolver<
      any,
      InputResolverArg<CreateTripInvitesArgs>,
      Promise<TripInviteRecord['id'][]>
    >;
  };
}
