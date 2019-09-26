import UserModel from '../models/User';

export interface UserServiceDeps {
  UserModel?: typeof UserModel;
}

export interface LoginArgs {
  username: string;
  password: string;
}

export interface RegisterArgs {
  email: string;
  password: string;
}
