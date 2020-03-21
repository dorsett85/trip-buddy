import { UserRecord } from 'common/lib/types/user';
import {TripInviteRecord} from "common/lib/types/tripInvite";
import BaseModel from './Base';
import { WhereArgs } from '../types';
import { QB } from '../utils/QueryBuilder';
import db from "../db/db";
import {extractRows} from "../utils/dbHelpers";

const qb = QB(db);

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

  public static findTripInvitees(): Promise<UserRecord[]> {
    return this.baseFindMany<UserRecord>({
      text: `accepting_trip_invites = 'no'`
    });
  }
  
  public static async createTripInvites(invite: Partial<TripInviteRecord>[]): Promise<TripInviteRecord[]> {
    const inviteIds = await qb('trip_invites').insert(invite).returning(['id']);
    return extractRows(inviteIds);
  }
}
