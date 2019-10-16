import UserModel from '../models/User';

export interface UserServiceDeps {
  UserModel?: typeof UserModel;
}

export interface RegisterArgs {
  email: string;
  password: string;
}

export interface LoginArgs {
  username: string;
  password: string;
}

export interface LoginResponse {
  id?: number;
  password?: string;
  token?: string;
}

export type RegisterResponse = LoginResponse;
