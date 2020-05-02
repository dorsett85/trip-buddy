import { UserRecord } from '../models/UserModel.types';
import UserModel from '../models/UserModel';

export interface UserServiceDeps {
  user: UserRecord;
  userModel: UserModel;
}
