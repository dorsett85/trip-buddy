import { UserInputError } from 'apollo-server-express';
import { UserResolversDeps, LoginArgs, RegisterArgs, UserSchema } from './user.types';

export const dummyUser: UserSchema = {
  id: 1,
  username: 'clayton',
  email: 'claytonphillipsdorsett@gmail.com',
  email_validated: false,
  created: new Date()
};

export const userResolvers = (dependencies: UserResolversDeps) => {
  const { UserService } = dependencies;
  return {
    Query: {
      user: (): UserSchema => dummyUser,
      users: (): UserSchema[] => [dummyUser]
    },
    Mutation: {
      loginUser: async (_: any, args: LoginArgs): Promise<string | undefined> => {
        const us = new UserService();
        const { id, password, token } = await us.login(args);

        if (!id || !password) {
          throw new UserInputError('Invalid username or password');
        }

        return token;
      },
      registerUser: async (_: any, args: RegisterArgs): Promise<string | undefined> => {
        const us = new UserService();
        const { id, token } = await us.register(args);

        if (id) {
          throw new UserInputError('User already exists');
        }

        return token;
      }
    }
  };
};
