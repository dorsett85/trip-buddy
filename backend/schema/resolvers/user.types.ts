import { IResolvers } from 'apollo-server-express';
import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import { FieldResolver, AuthFieldResolver, InputResolverArg } from '../types/resolvers';
import { LoginArgs, RegisterArgs } from '../../types/access';
import { UpdateUserArgs } from '../../types/user';

export interface UserResolvers extends IResolvers {
  User: {
    trips: AuthFieldResolver<UserRecord, {}, Promise<TripRecord[]>>;
  };
  Query: {
    user: AuthFieldResolver<any, {}, Promise<UserRecord>>;
    possibleTripInvitees: AuthFieldResolver<
      any,
      { tripId: TripRecord['id'] },
      Promise<UserRecord[]>
    >;
  };
  Mutation: {
    loginUser: FieldResolver<any, LoginArgs, Promise<string>>;
    registerUser: FieldResolver<any, RegisterArgs, Promise<string>>;
    verifyEmail: AuthFieldResolver<any, { token: string }, Promise<number>>;
    updateUser: AuthFieldResolver<
      any,
      InputResolverArg<UpdateUserArgs>,
      Promise<UserRecord['id']>
    >;
  };
}
