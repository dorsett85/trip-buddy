/* eslint-disable camelcase */
import { IResolvers } from 'apollo-server-express';
import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { FieldResolver, AuthFieldResolver, InputResolverArg } from '../types/resolvers';
import { LoginArgs, RegisterArgs } from '../../types/access';
import {
  CreateTripInvitesArgs,
  UpdateUserArgs,
} from '../../types/user';

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
    updateUser: AuthFieldResolver<
      any,
      InputResolverArg<UpdateUserArgs>,
      Promise<UserRecord['id']>
    >;
    createTripInvites: AuthFieldResolver<
      any,
      InputResolverArg<CreateTripInvitesArgs>,
      Promise<TripInviteRecord['id'][]>
    >;
  };
}
