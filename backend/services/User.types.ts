import UserModel from "../models/User";

export interface UserServiceDeps {
  UserModel?: typeof UserModel
}

export interface UserBasic {
  password: string;
  email: string
}

export type LoginArgs = UserBasic & { username: string };
export type RegisterArgs = UserBasic;