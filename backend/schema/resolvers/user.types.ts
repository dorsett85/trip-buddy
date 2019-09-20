import UserService from '../../services/User';

export interface UserSchema {
  id: number;
  username: string;
  password?: string;
  email: string;
  // eslint-disable-next-line camelcase
  email_validated: boolean;
  created: Date;
}

export interface BasicUserArgs {
  username: string;
  password: string;
  email: string;
}

export interface UserResolversDeps {
  UserService: typeof UserService
}