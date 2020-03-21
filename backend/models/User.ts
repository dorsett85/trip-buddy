import { UserRecord } from 'common/lib/types/user';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import BaseModel from './Base';
import { WhereArgs } from '../types';
import { QB } from '../utils/QueryBuilder';
import db from '../db/db';
import { extractRows } from '../utils/dbHelpers';
import { TripRecord } from 'common/lib/types/trip';

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

  public static async findTripInvitees(tripId: TripRecord['id']): Promise<UserRecord[]> {
    // TODO Update accepting_trip_invites to 'friends' or 'all' when user setup wizard is completed!
    const query = qb.raw(
      `
      SELECT * FROM users
        LEFT JOIN trip_invites ti on users.id = ti.invitee_id
      WHERE ti.trip_id != ? OR ti.trip_id is null
        AND accepting_trip_invites = 'no'
    `,
      [tripId]
    );
    return extractRows(await query);
  }

  public static async createTripInvites(
    invite: Partial<TripInviteRecord>[]
  ): Promise<TripInviteRecord[]> {
    const inviteIds = qb('trip_invites')
      .insert(invite)
      .returning(['id']);
    return extractRows(await inviteIds);
  }
}
