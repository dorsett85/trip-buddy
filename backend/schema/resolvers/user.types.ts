import { IResolvers } from 'apollo-server-express';
import {
  AuthUserFieldResolvers,
  AuthQueryFieldResolvers,
  MutationFieldResolvers,
  AuthMutationFieldResolvers
} from '../types/resolvers';

export interface UserResolvers extends IResolvers {
  User: {
    trips: AuthUserFieldResolvers['trips'];
  };
  Query: {
    user: AuthQueryFieldResolvers['user'];
    possibleTripInvitees: AuthQueryFieldResolvers['possibleTripInvitees'];
  };
  Mutation: {
    loginUser: MutationFieldResolvers['loginUser'];
    registerUser: MutationFieldResolvers['registerUser'];
    verifyEmail: AuthMutationFieldResolvers['verifyEmail'];
    updateUser: AuthMutationFieldResolvers['updateUser'];
  };
}
