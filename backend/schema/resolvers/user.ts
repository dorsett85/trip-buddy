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
      user: (_: any, args: any): UserSchema => dummyUser,
      users: (_: any, args: any): UserSchema[] => [dummyUser]
    },
    Mutation: {
      loginUser: async (_: any, args: LoginArgs): Promise<UserSchema> => {
        const us = new UserService();
        const user = await us.login(args);

        // Check for errors if no user is found or if password is incorrect
        if (!user.id || !user.password) {
          throw new UserInputError('Invalid username or password');
        }

        return user;
      },
      registerUser: (_: any, args: RegisterArgs): Promise<UserSchema> => {
        const user = new UserService();
        return user.register(args);
      }
    }
  };
};
