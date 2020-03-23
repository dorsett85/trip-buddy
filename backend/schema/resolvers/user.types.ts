/* eslint-disable camelcase */
import { IResolvers } from 'apollo-server-express';
import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { FieldResolver, AuthFieldResolver } from '../types/resolvers';
import { LoginArgs, RegisterArgs } from '../../types/access';
import { CreateTripInvitesInput, UpdateUserInput } from '../../types/user';

export interface UserResolvers extends IResolvers {
  User: {
    trips: AuthFieldResolver<UserRecord, any, Promise<TripRecord[]>>;
  };
  Query: {
    user: AuthFieldResolver<any, any, Promise<UserRecord>>;
    possibleTripInvitees: AuthFieldResolver<
      any,
      { tripId: TripRecord['id'] },
      Promise<UserRecord[]>
    >;
  };
  Mutation: {
    loginUser: FieldResolver<any, LoginArgs, Promise<string>>;
    registerUser: FieldResolver<any, RegisterArgs, Promise<string>>;
    updateUser: AuthFieldResolver<any, UpdateUserInput, Promise<UserRecord['id']>>;
    createTripInvites: AuthFieldResolver<
      any,
      CreateTripInvitesInput,
      Promise<TripInviteRecord['id'][]>
    >;
  };
}
