import { UserRecord } from 'common/lib/types/user';
import { IUserModel } from '../models/UserModel.types';
import { LoginArgs, RegisterArgs } from '../types/access';

export interface AccessServiceDeps {
  userModel: IUserModel;
  jwtSecretKey: string;
}

export interface IAccessService {
  getActiveUser(token: string): Promise<UserRecord | null>;

  login(args: LoginArgs): Promise<string>;

  register(args: RegisterArgs): Promise<string>;
}
