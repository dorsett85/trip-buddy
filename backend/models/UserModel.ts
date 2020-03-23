import { UserRecord } from 'common/lib/types/user';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { TripRecord } from 'common/lib/types/trip';
import BaseModel from './BaseModel';
import { extractRows } from '../utils/dbHelpers';
import { IUserModel } from './UserModel.types';
import { WhereArgs } from '../types/dbQueryUtils';
import {
  CreateTripInvitesWithInviterIdArgs,
  CreateUserArgs,
  PartialUserRecord,
  UpdateUserArgs
} from '../types/user';

export default class UserModel extends BaseModel implements IUserModel {
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

  public async createTripInvites(
    invite: CreateTripInvitesWithInviterIdArgs
  ): Promise<TripInviteRecord[]> {
    const inviteIds = this.db('trip_invites')
      .insert(invite)
      .returning(['id']);
    return extractRows(await inviteIds);
  }
}
