import UserModel from '../models/User';

export interface UserServiceDeps {
  UserModel?: typeof UserModel;
}

export interface TokenResponse {
  token?: string;
}

export interface LoginResponse extends TokenResponse {
  username?: string;
  password?: string;
}

export interface RegisterResponse extends TokenResponse {
  email?: string;
}