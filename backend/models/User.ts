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
      SELECT u.* FROM users u
      WHERE u.id NOT IN (
          SELECT t.invitee_id
          FROM trip_invites t
          WHERE t.trip_id = ?
      ) AND u.accepting_trip_invites = 'no'
    `,
      [tripId]
    );
    return extractRows(await query);
  }

  public static async createTripInvites(
    invite: Partial<TripInviteRecord>[]
  ): Promise<TripInviteRecord[]> {
    console.log(invite);
    const inviteIds = qb('trip_invites')
      .insert(invite)
      .returning(['id']);
    return extractRows(await inviteIds);
  }
}
