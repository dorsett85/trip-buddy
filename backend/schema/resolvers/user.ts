import { UserInputError } from 'apollo-server-express';
import { UserResolvers } from './user.types';
import {
  USER_ALREADY_EXISTS_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_LOGIN_MESSAGE,
  NOT_FOUND_MESSAGE
} from '../../utils/constants/errors';

export const userResolvers: UserResolvers = {
  User: {
    trips: (user, __, { tripService }) => {
      return tripService.findMany({ userId: user.id });
    }
  },
  Query: {
    user: async (_, __, { userService }) => {
      const user = await userService.findOne();
      if (!user) {
        throw new UserInputError(USER_NOT_FOUND_MESSAGE);
      }
      return user;
    },
    possibleTripInvitees: (_, { tripId }, { userService }) => {
      return userService.possibleTripInvitees(tripId);
    }
  },
  Mutation: {
    loginUser: async (_, loginArgs, { accessService }) => {
      const token = await accessService.login(loginArgs);

      if (token === USER_NOT_FOUND_MESSAGE) {
        throw new UserInputError(USER_NOT_FOUND_MESSAGE);
      }

      if (token === INVALID_LOGIN_MESSAGE) {
        throw new UserInputError(INVALID_LOGIN_MESSAGE);
      }

      return token;
    },
    registerUser: async (_, registerArgs, { accessService }) => {
      const token = await accessService.register(registerArgs);

      if (token === USER_ALREADY_EXISTS_MESSAGE) {
        throw new UserInputError(USER_ALREADY_EXISTS_MESSAGE);
      }

      return token;
    },
    verifyEmail: (_, { token }, { userService }) => {
      return userService.verifyEmail(token);
    },
    updateUser: async (_, { input }, { userService, user }) => {
      const updatedCount = await userService.updateOne(input);
      if (!updatedCount) {
        throw new UserInputError(NOT_FOUND_MESSAGE);
      }
      return user.id;
    }
  }
};
