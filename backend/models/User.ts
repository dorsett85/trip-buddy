import { UserRecord } from 'common/lib/types/user';
import BaseModel from './Base';
import { WhereArgs } from '../types';
import { extractRows } from '../utils/dbHelpers';

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

  public static updateOne(
    updateArgs: Partial<UserRecord>,
    whereArgs: WhereArgs<Partial<UserRecord>>
  ): Promise<number> {
    return this.baseUpdateOne(updateArgs, whereArgs);
  }

  public static findTripInviteUsers(): Promise<UserRecord[]> {
    return this.baseFindMany<UserRecord>({
      text: `accepting_trip_invites = 'no'`
    });
  }
}
