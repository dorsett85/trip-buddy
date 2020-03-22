import { UserRecord } from 'common/lib/types/user';
import { IUserModel } from '../models/UserModel.types';

export interface UserServiceDeps {
  user: UserRecord;
  userModel: IUserModel;
}
