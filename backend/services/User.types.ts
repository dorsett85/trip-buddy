import UserModel from '../models/User';
import { UserRecord } from '../models/User.types';

export interface UserServiceDeps {
  UserModel?: typeof UserModel;
}

export interface UserToken {
  id: UserRecord['id'];
  password: UserRecord['password'];
}
