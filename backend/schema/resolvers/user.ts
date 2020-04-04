import { UserInputError } from 'apollo-server-express';
import { UserResolvers } from './user.types';
import {
  USER_ALREADY_EXISTS_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_LOGIN_MESSAGE,
  NOT_FOUND_MESSAGE
} from '../../utils/constants/errors';

const User: UserResolvers['User'] = {
  trips: async (_, __, { tripService }) => {
    const userTrips = await tripService.findMany();
    return userTrips;
  }
};

const Query: UserResolvers['Query'] = {
  user: async (_, __, { userService }) => {
    const user = await userService.findOne();
    if (!user) {
      throw new UserInputError(USER_NOT_FOUND_MESSAGE);
    }
    return user;
  },
  possibleTripInvitees: async (_, { tripId }, { userService }) => {
    const possibleTripInvitees = await userService.possibleTripInvitees(tripId);
    return possibleTripInvitees;
  }
};

const Mutation: UserResolvers['Mutation'] = {
  loginUser: async (_, args, { accessService }) => {
    const token = await accessService.login(args);

    if (token === USER_NOT_FOUND_MESSAGE) {
      throw new UserInputError(USER_NOT_FOUND_MESSAGE);
    }

    if (token === INVALID_LOGIN_MESSAGE) {
      throw new UserInputError(INVALID_LOGIN_MESSAGE);
    }

    return token;
  },
  registerUser: async (_, args, { accessService }) => {
    const token = await accessService.register(args);

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
  },
  createTripInvites: async (_, { input }, { userService }) => {
    const tripInviteIds = await userService.createTripInvites(input);
    return tripInviteIds;
  }
};

export const userResolvers: UserResolvers = { User, Query, Mutation };
