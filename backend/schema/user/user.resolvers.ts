import { UserSchema, BasicUserArgs } from './user.types';

const dummyUser: UserSchema = {
  id: 1,
  username: 'clayton',
  password: 'clayton',
  email: 'claytonphillipsdorsett@gmail.com',
  email_validated: false,
  created: new Date().getTime()
};

export const userResolvers = {
  Query: {
    user: (): UserSchema => dummyUser,
    users: (): Array<UserSchema> => [dummyUser]
  },
  Mutation: {
    loginUser: (_: any, args: BasicUserArgs) => {
      console.log(args);
      return dummyUser;
    },
    registerUser: (_: any, args: BasicUserArgs) => {
      console.log(args);
      return dummyUser;
    }
  }
};
