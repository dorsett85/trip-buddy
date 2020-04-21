import { IResolvers } from 'apollo-server-express';
import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import { LoginArgs, RegisterArgs } from 'common/lib/types/gqlSchema/access';
import { UpdateUserInputArgs } from 'common/lib/types/gqlSchema/user';
import { FieldResolver, AuthFieldResolver } from '../types/resolvers';

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
    updateUser: AuthFieldResolver<any, UpdateUserInputArgs, Promise<UserRecord['id']>>;
  };
}
