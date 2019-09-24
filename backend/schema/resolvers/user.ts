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
      loginUser: (_: any, args: LoginArgs): Promise<UserSchema> => {
        const user = new UserService();
        return user.login(args);
      },
      registerUser: (_: any, args: RegisterArgs): Promise<UserSchema> => {
        const user = new UserService();
        return user.register(args);
      }
    }
  };
};
