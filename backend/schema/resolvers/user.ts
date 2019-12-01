import { UserInputError } from 'apollo-server-express';
import { UserResolvers } from './user.types';
import {
  USER_ALREADY_EXISTS_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_LOGIN_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE
} from '../../utils/constants/errors';

const User: UserResolvers['User'] = {
  trips: async (_, __, { user, TripService }) => {
    const userTrips = await TripService.findByUserId(user.id);
    return userTrips;
  }
};

const Query: UserResolvers['Query'] = {
  user: async (_, __, { user, UserService }) => {
    const foundUser = await UserService.findOne({ id: user.id });
    if (!foundUser) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return foundUser;
  },
  users: (_, __, { user }) => [user]
};

const Mutation: UserResolvers['Mutation'] = {
  loginUser: async (_, args, { UserService }) => {
    const token = await UserService.login(args);

    if (token === USER_NOT_FOUND_MESSAGE) {
      throw new UserInputError(USER_NOT_FOUND_MESSAGE);
    }

    if (token === INVALID_LOGIN_MESSAGE) {
      throw new UserInputError(INVALID_LOGIN_MESSAGE);
    }

    return token;
  },
  registerUser: async (_, args, { UserService }) => {
    const token = await UserService.register(args);

    if (token === USER_ALREADY_EXISTS_MESSAGE) {
      throw new UserInputError(USER_ALREADY_EXISTS_MESSAGE);
    }

    return token;
  },
  updateUser: async (_, { input }, { user, UserService }) => {
    const updatedUser = await UserService.updateOne(input, { id: user.id });
    if (!updatedUser) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return updatedUser;
  }
};

export const userResolvers: UserResolvers = { User, Query, Mutation };
