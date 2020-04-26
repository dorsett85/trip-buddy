import { IResolvers } from 'apollo-server-express';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import {
  AuthMutationFieldResolvers,
  AuthQueryFieldResolvers,
  AuthSubscriptionFieldResolverObj,
  AuthTripInviteFieldResolvers
} from '../types/resolvers';

export interface TripInviteResolvers extends IResolvers {
  TripInvite: {
    trip: AuthTripInviteFieldResolvers['trip'];
  };
  Query: {
    tripInvites: AuthQueryFieldResolvers['tripInvites'];
  };
  Mutation: {
    createTripInvites: AuthMutationFieldResolvers['createTripInvites'];
    updateTripInvite: AuthMutationFieldResolvers['updateTripInvite'];
    acceptTripInvite: AuthMutationFieldResolvers['acceptTripInvite'];
  };
  Subscription: {
    tripInviteCreated: AuthSubscriptionFieldResolverObj<
      TripInviteRecord[],
      {},
      TripInviteRecord
    >;
  };
}
