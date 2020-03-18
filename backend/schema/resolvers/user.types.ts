/* eslint-disable import/no-cycle */
import { IResolvers } from 'apollo-server-express';
import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import {
  InputResolverArg,
  FieldResolver,
  AuthFieldResolver
} from '../../types/resolvers';

export interface LoginArgs {
  username: string;
  password: string;
}

export interface RegisterArgs {
  email: string;
  password: string;
}

export type UpdateUserInput = InputResolverArg<Omit<UserSchema, 'id' | 'created_date'>>;

export type CreateTripInvitesInput = InputResolverArg<
  { id?: UserRecord['id']; email: UserRecord['email'] }[]
>;

export interface UserResolvers extends IResolvers {
  User: {
    trips: AuthFieldResolver<UserRecord, any, Promise<TripRecord[]>>;
  };
  Query: {
    user: AuthFieldResolver<any, any, Promise<UserRecord>>;
    possibleTripInvitees: AuthFieldResolver<any, any, Promise<UserRecord[]>>;
  };
  Mutation: {
    loginUser: FieldResolver<any, LoginArgs, Promise<string>>;
    registerUser: FieldResolver<any, RegisterArgs, Promise<string>>;
    updateUser: AuthFieldResolver<any, UpdateUserInput, Promise<UserRecord['id']>>;
    createTripInvites: AuthFieldResolver<any, CreateTripInvitesInput, Promise<number[]>>;
  };
}

export interface UserSchema extends Partial<UserRecord> {}
