import { IResolvers } from 'apollo-server-express';
/* eslint-disable import/no-cycle */
import { ContextFieldResolver } from '../../types/resolvers';
import { TripSchema } from './trip.types';

interface LoginArgs {
  username: string;
  password: string;
}

interface RegisterArgs {
  email: string;
  password: string;
}

export interface UserResolvers extends IResolvers {
  User: {
    trips: ContextFieldResolver<any, Promise<TripSchema[]>>;
  };
  Query: {
    user: ContextFieldResolver<any, UserSchema>;
    users: ContextFieldResolver<any, UserSchema[]>;
  };
  Mutation: {
    loginUser: ContextFieldResolver<LoginArgs, Promise<string | undefined>>;
    registerUser: ContextFieldResolver<RegisterArgs, Promise<string | undefined>>;
  };
}

/* eslint-disable camelcase */
export interface UserSchema {
  id?: number;
  username?: String;
  email?: String;
  email_validated?: boolean;
  created_date?: Date;
}
