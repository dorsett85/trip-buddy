import { IResolvers } from 'apollo-server-express';
import { ContextFieldResolver, ContextAuthFieldResolver } from '../../types/resolvers';
import { TripSchema, TripLegSchema } from './trip.types';
import { UserRecord } from '../../models/User.types';

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
    trips: ContextAuthFieldResolver<any, Promise<TripSchema[]>>;
  };
  Query: {
    user: ContextAuthFieldResolver<any, UserSchema>;
    users: ContextAuthFieldResolver<any, UserSchema[]>;
  };
  Mutation: {
    loginUser: ContextFieldResolver<LoginArgs, Promise<string | undefined>>;
    registerUser: ContextFieldResolver<RegisterArgs, Promise<string | undefined>>;
  };
}

export interface UserSchema extends Partial<UserRecord> {
  trips?: TripSchema[];
}
