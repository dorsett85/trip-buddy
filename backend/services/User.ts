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

  public findOne(): Promise<UserRecord | undefined> {
    const { id } = this.user;
    return this.UserModel.findOne({ id });
  }

  public updateOne(
    updateUserInput: UpdateUserInput['input']
  ): Promise<UserRecord | undefined> {
    const { id } = this.user;
    return this.UserModel.updateOne(updateUserInput, { id });
  }
}
