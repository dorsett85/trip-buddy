import { UserInputError } from 'apollo-server-express';
import { UserResolvers } from './user.types';
import { isAuthenticated } from '../../utils/isAuthenticated';

const Query: UserResolvers['Query'] = {
  user: isAuthenticated((_, __, { user }) => user),
  users: isAuthenticated((_, __, { user }) => [user])
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

// Nested queries
const User: UserResolvers['User'] = {
  trips: isAuthenticated(async (_, __, { user, TripService }) => {
    if (!user) {
      return [];
    }
    const userTrips = await TripService.getByUserId(user.id as number);
    return userTrips;
  })
};

export const userResolvers: UserResolvers = { User, Query, Mutation };
