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
  username?: string;
  password?: string;
  token?: string;
}

export interface RegisterResponse {
  email?: string;
  token?: string;
}