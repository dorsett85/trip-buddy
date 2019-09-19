import User from '../../services/User/User';
import { UserSchema, UserResolversDeps } from './user.types';
import { LoginArgs, RegisterArgs } from '../../services/User/User.types';

const dummyUser: UserSchema = {
  id: 1,
  username: 'clayton',
  password: 'clayton',
  email: 'claytonphillipsdorsett@gmail.com',
  email_validated: false,
  created: new Date().getTime()
};

export const userResolversFactory = (dependencies: UserResolversDeps) => {  
  const { UserService } = dependencies;
  return {
    Query: {
      user: (): UserSchema => dummyUser,
      users: (): Array<UserSchema> => [dummyUser]
    },
    Mutation: {
      loginUser: (_: any, args: LoginArgs): UserSchema => {
        const user = new UserService();
        user.login(args);
        return dummyUser;
      },
      registerUser: (_: any, args: RegisterArgs): UserSchema => {
        const user = new UserService();
        user.register(args);
        return dummyUser;
      }
    }
  };
};

export const userResolvers = userResolversFactory({
  UserService: User
});
