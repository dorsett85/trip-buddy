import { IResolvers } from 'apollo-server-express';
/* eslint-disable import/no-cycle */
import { ContextFieldResolver } from '../../types/resolvers';
import { TripSchema } from './trip.types';

// Argument objects
interface LoginArgs {
  username: string;
  password: string;
}

interface RegisterArgs {
  email: string;
  password: string;
}

// Resolvers object
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

// Schema object
export interface UserSchema {
  id?: number;
  username?: String;
  email?: String;
  // eslint-disable-next-line camelcase
  email_validated?: boolean;
  created?: Date;
}
