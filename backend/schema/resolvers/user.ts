import { UserInputError } from 'apollo-server-express';
import { UserResolvers } from './user.types';
import {
  USER_ALREADY_EXISTS_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_LOGIN_MESSAGE,
  NOT_FOUND_MESSAGE
} from '../../utils/constants/errors';

const User: UserResolvers['User'] = {
  trips: async ({ id }, __, { tripService }) => {
    const userTrips = await tripService.findMany(id);
    return userTrips;
  }
};

const Query: UserResolvers['Query'] = {
  user: async (_, __, { userService }) => {
    const foundUser = await userService.findOne();
    if (!foundUser) {
      throw new UserInputError(USER_NOT_FOUND_MESSAGE);
    }
    return foundUser;
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
  updateUser: async (_, { input }, { userService }) => {
    const updatedUser = await userService.updateOne(input);
    if (!updatedUser) {
      throw new UserInputError(NOT_FOUND_MESSAGE);
    }
    return updatedUser;
  }
};

export const userResolvers: UserResolvers = { User, Query, Mutation };
