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

export interface LoginArgs {
  username: string;
  password: string;
}

export interface RegisterArgs {
  email: string;
  password: string;
}
