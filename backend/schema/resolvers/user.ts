import { UserInputError, IResolverObject, IResolvers } from 'apollo-server-express';
import { LoginArgs, RegisterArgs, UserSchema } from './user.types';
import { ContextObj } from '../context.types';

const User: IResolverObject = {
  trips: (user: UserSchema) => {
    console.log(user);
    return [];
  }
}

const Query = {
  user: (_: any, __: any, { user }: ContextObj): UserSchema => {
    return user || {};
  },
  users: (_: any, __: any, { user }: ContextObj): UserSchema[] => {
    return [user || {}];
  }
};

const Mutation = {
  loginUser: async (
    _: any,
    args: LoginArgs,
    { UserService }: ContextObj
  ): Promise<string | undefined> => {
    const { username, password, token } = await UserService.login(args);

    if (!username) {
      throw new UserInputError('User does not exist');
    }

    if (!password) {
      throw new UserInputError('Invalid username or password');
    }

    return token;
  },
  registerUser: async (
    _: any,
    args: RegisterArgs,
    { UserService }: ContextObj
  ): Promise<string | undefined> => {
    const { email, token } = await UserService.register(args);

    if (email) {
      throw new UserInputError('User already exists');
    }

    return token;
  }
};

export const userResolvers: IResolvers = { User, Query, Mutation };
