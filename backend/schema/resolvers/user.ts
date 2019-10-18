import { UserInputError } from 'apollo-server-express';
import { LoginArgs, RegisterArgs, UserSchema } from './user.types';
import { ContextObj } from '../context.types';

export const dummyUser: UserSchema = {
  id: 1,
  username: 'clayton',
  email: 'claytonphillipsdorsett@gmail.com',
  email_validated: false,
  created: new Date()
};

export const userResolvers = {
  Query: {
    user: (): UserSchema => dummyUser,
    users: (): UserSchema[] => [dummyUser]
  },
  Mutation: {
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
  }
};
