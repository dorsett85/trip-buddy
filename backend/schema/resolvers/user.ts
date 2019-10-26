import { UserInputError } from 'apollo-server-express';
import { UserResolvers } from './user.types';

const User: UserResolvers['User'] = {
  trips: (_, __, { user, TripService }) => {
    if (!user) {
      return [];
    }
    return [{ id: 1 }];
  }
};

const Query: UserResolvers['Query'] = {
  user: (_, __, { user }) => {
    return user || {};
  },
  users: (_, __, { user }) => {
    return [user || {}];
  }
};

const Mutation: UserResolvers['Mutation'] = {
  loginUser: async (_, args, { UserService }) => {
    const { username, password, token } = await UserService.login(args);

    if (!username) {
      throw new UserInputError('User does not exist');
    }

    if (!password) {
      throw new UserInputError('Invalid username or password');
    }

    return token;
  },
  registerUser: async (_, args, { UserService }) => {
    const { email, token } = await UserService.register(args);

    if (email) {
      throw new UserInputError('User already exists');
    }

    return token;
  }
};

export const userResolvers: UserResolvers = { User, Query, Mutation };
