import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import BaseModel from './BaseModel';
import { extractRows } from '../utils/dbHelpers';
import { WhereArgs } from '../types/dbQueryUtils';
import { CreateUserArgs, PartialUserRecord, UpdateUserArgs } from '../types/user';

export default class UserModel extends BaseModel {
  public async verifyEmail(token: string, user: UserRecord): Promise<number> {
    const query = this.db.raw(
      `
      UPDATE users
      SET 
          new_user_setup = new_user_setup || ?,
          email_verified = true
      WHERE username = ? -- TODO add email_verification_token check
    `,
      [{ email_verified: true }, user.username /* TODO add token */]
    );
    return (await query).rowCount;
  }

  public createOne(user: CreateUserArgs): Promise<UserRecord> {
    return this.baseCreateOne<UserRecord>(user);
  }

  public findOne(
    whereArgs: WhereArgs<PartialUserRecord>
  ): Promise<UserRecord | undefined> {
    return this.baseFindOne(whereArgs);
  }

  public updateOne(
    updateArgs: UpdateUserArgs,
    whereArgs: WhereArgs<PartialUserRecord>
  ): Promise<number> {
    return this.baseUpdateOne(updateArgs, whereArgs);
  }

  public async findTripInvitees(tripId: TripRecord['id']): Promise<UserRecord[]> {
    // TODO Update accepting_trip_invites to 'friends' or 'all' when user setup wizard is completed!
    const query = this.db.raw(
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
}
