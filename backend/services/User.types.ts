import { UserRecord } from 'common/lib/types/user';
import UserModel from '../models/User';

export interface UserServiceDeps {
  user: UserRecord;
  UserModel: typeof UserModel;
}
