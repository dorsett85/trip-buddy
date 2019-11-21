import { UserInputError } from 'apollo-server-express';
import { UserResolvers } from './user.types';

const User: UserResolvers['User'] = {
  trips: async (_, __, { user, TripService }) => {
    const userTrips = await TripService.getByUserId(user.id);
    return userTrips;
  }
};

const Query: UserResolvers['Query'] = {
  user: (_, __, { user }) => user,
  users: (_, __, { user }) => [user]
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
