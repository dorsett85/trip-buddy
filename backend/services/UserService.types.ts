import { UserRecord } from 'common/lib/types/user';
import UserModel from '../models/UserModel';

export interface UserServiceDeps {
  user: UserRecord;
  userModel: UserModel;
}
