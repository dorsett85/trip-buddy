import { UserRecord } from './User.types';
import BaseModel from './Base';

export default class UserModel extends BaseModel {
  public static tableName = 'users';

  public static async createOne(user: Partial<UserRecord>): Promise<UserRecord> {
    return this.baseCreateOne(user);
  }

  public static async findOne(
    andWhereArgs: Partial<UserRecord> = {},
    orWhereArgs: Partial<UserRecord> = {}
  ): Promise<UserRecord | undefined> {
    return this.baseFindOne(andWhereArgs, orWhereArgs);
  }

  public static async findMany(
    andWhereArgs: Partial<UserRecord> = {},
    orWhereArgs: Partial<UserRecord> = {}
  ): Promise<UserRecord[]> {
    return this.baseFindMany(andWhereArgs, orWhereArgs);
  }
}
