import { UserRecord } from 'common/lib/types/user';
import BaseModel from './Base';
import { WhereArgs } from '../types';

export default class UserModel extends BaseModel {
  public static tableName = 'users';

  public static createOne(user: Partial<UserRecord>): Promise<UserRecord> {
    return this.baseCreateOne(user);
  }

  public static findOne(
    whereArgs: WhereArgs<Partial<UserRecord>>
  ): Promise<UserRecord | undefined> {
    return this.baseFindOne(whereArgs);
  }

  public static findMany(
    whereArgs: WhereArgs<Partial<UserRecord>>
  ): Promise<UserRecord[]> {
    return this.baseFindMany(whereArgs);
  }

  public static updateOne(
    updateArgs: Partial<UserRecord>,
    whereArgs: WhereArgs<Partial<UserRecord>>
  ): Promise<UserRecord | undefined> {
    return this.baseUpdateOne(updateArgs, whereArgs);
  }
}
