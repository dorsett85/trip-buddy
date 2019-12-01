/* eslint-disable import/no-cycle */
import { IResolvers } from 'apollo-server-express';
import {
  ContextFieldResolver,
  ContextAuthFieldResolver,
  InputResolverArg
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

export type UpdateUserInput = InputResolverArg<Omit<Partial<UserRecord>, 'id'>>;

export interface UserResolvers extends IResolvers {
  User: {
    trips: ContextAuthFieldResolver<any, Promise<TripSchema[]>>;
  };
  Query: {
    user: ContextAuthFieldResolver<any, Promise<UserSchema>>;
    users: ContextAuthFieldResolver<any, UserSchema[]>;
  };
  Mutation: {
    loginUser: ContextFieldResolver<LoginArgs, Promise<string>>;
    registerUser: ContextFieldResolver<RegisterArgs, Promise<string>>;
    updateUser: ContextAuthFieldResolver<UpdateUserInput, Promise<UserSchema>>;
  };
}

export interface UserSchema extends Partial<UserRecord> {
  trips?: TripSchema[];
}
