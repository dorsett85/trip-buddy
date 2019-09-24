import { UserResolversDeps } from './user.types';
import { LoginArgs, RegisterArgs } from '../../services/User.types';

export const dummyUser = {
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
      user: (_: any, args: any) => dummyUser,
      users: (_: any, args: any) => [dummyUser]
    },
    Mutation: {
      loginUser: (_: any, args: LoginArgs) => {
        const user = new UserService();
        return user.login(args);
      },
      registerUser: (_: any, args: RegisterArgs) => {
        const user = new UserService();
        return user.register(args);
      }
    }
  }
}
