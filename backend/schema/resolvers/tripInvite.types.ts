import { IResolvers } from 'apollo-server-express';
import { TripRecord } from 'common/lib/types/trip';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import {
  CreateTripInvitesInputArgs,
  UpdateTripInvitesInputArgs
} from 'common/lib/types/gqlSchema/tripInvite';
import { AuthFieldResolver, AuthSubscriptionFieldResolverObj } from '../types/resolvers';

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
      CreateTripInvitesInputArgs,
      Promise<TripInviteRecord['id'][]>
    >;
    updateTripInvite: AuthFieldResolver<
      any,
      UpdateTripInvitesInputArgs,
      Promise<TripInviteRecord['id']>
    >;
    acceptTripInvite: AuthFieldResolver<
      any,
      Pick<TripInviteRecord, 'id'>,
      Promise<TripRecord>
    >;
  };
  Subscription: {
    tripInviteCreated: AuthSubscriptionFieldResolverObj<
      TripInviteRecord[],
      {},
      TripInviteRecord
    >;
  };
}
