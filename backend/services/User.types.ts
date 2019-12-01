import UserModel from '../models/User';

export interface UserServiceDeps {
  UserModel?: typeof UserModel;
}
