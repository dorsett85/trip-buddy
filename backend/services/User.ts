import { UserRecord } from 'common/lib/types/user';
import UserModel from '../models/User';
import { UserServiceDeps } from './User.types';
// eslint-disable-next-line import/no-cycle
import { UpdateUserInput } from '../schema/resolvers/user.types';

export default class UserService {
  private user: UserRecord;

  private UserModel: typeof UserModel;

  constructor(dependencies: UserServiceDeps) {
    this.user = dependencies.user;
    this.UserModel = dependencies.UserModel;
  }

  public findOne(
    andWhereArgs: Partial<UserRecord> = {},
    orWhereArgs: Partial<UserRecord> = {}
  ): Promise<UserRecord | undefined> {
    return this.UserModel.findOne(andWhereArgs, orWhereArgs);
  }

  public updateOne(
    updateUserInput: UpdateUserInput['input'],
    andWhereArgs: Partial<UserRecord> = {},
    orWhereArgs: Partial<UserRecord> = {}
  ): Promise<UserRecord | undefined> {
    return this.UserModel.updateOne(updateUserInput, andWhereArgs, orWhereArgs);
  }
}
