import UserService from '../../services/User';

export interface UserSchema {
  id: number;
  username: String;
  email: String;
  // eslint-disable-next-line camelcase
  email_validated: Boolean;
  created: Date;
}

export interface UserResolversDeps {
  UserService: typeof UserService;
}

export interface UserBasic {
  password: string;
  email: string;
}

export type LoginArgs = UserBasic & { username: string };
export type RegisterArgs = UserBasic;
