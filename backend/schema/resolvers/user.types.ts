/* eslint-disable import/no-cycle */
import { IResolvers } from 'apollo-server-express';
import {
  InputResolverArg,
  FieldResolver,
  AuthFieldResolver
} from '../../types/resolvers';
import { TripSchema } from './trip.types';
import { UserRecord } from '../../models/User.types';

export interface LoginArgs {
  username: string;
  password: string;
}

export interface RegisterArgs {
  email: string;
  password: string;
}

export type UpdateUserInput = InputResolverArg<Omit<UserSchema, 'id' | 'created_date'>>;

export interface UserResolvers extends IResolvers {
  User: {
    trips: AuthFieldResolver<UserRecord, any, Promise<TripSchema[]>>;
  };
  Query: {
    user: AuthFieldResolver<any, any, Promise<UserSchema>>;
  };
  Mutation: {
    loginUser: FieldResolver<any, LoginArgs, Promise<string>>;
    registerUser: FieldResolver<any, RegisterArgs, Promise<string>>;
    updateUser: AuthFieldResolver<any, UpdateUserInput, Promise<UserSchema>>;
  };
}

export interface UserSchema extends Partial<UserRecord> {}
