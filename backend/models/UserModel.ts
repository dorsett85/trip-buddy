import { RequireId } from 'common/lib/types/utils';
import BaseModel from './BaseModel';
import { extractRows } from '../utils/dbHelpers';
import { WhereArgGroup } from '../types/dbQueryUtils';
import { UpdateUserInput } from '../schema/types/graphql';
import { PartialUserRecord, UserRecord } from './UserModel.types';
import { TripRecord } from './TripModel.types';

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

  public createOne(
    user: Pick<UserRecord, 'username' | 'password' | 'email'>
  ): Promise<UserRecord> {
    return this.baseCreateOne<UserRecord>(user);
  }

  public findOne(findOneArgs: PartialUserRecord): Promise<UserRecord | undefined> {
    const whereArgs: WhereArgGroup<PartialUserRecord> = { items: findOneArgs };
    return this.baseFindOne(whereArgs);
  }

  public findByUsernameOrEmail(
    findArgs: Pick<UserRecord, 'username' | 'email'>
  ): Promise<UserRecord | undefined> {
    const whereArgs: WhereArgGroup<Pick<UserRecord, 'username' | 'email'>> = {
      items: findArgs,
      logicalOperator: 'OR'
    };
    return this.baseFindOne<UserRecord>(whereArgs);
  }

  public updateOne(
    updateArgs: UpdateUserInput,
    updateWhere: RequireId<PartialUserRecord>
  ): Promise<number> {
    const whereArgs: WhereArgGroup<RequireId<PartialUserRecord>> = { items: updateWhere };
    return this.baseUpdateOne(updateArgs, whereArgs);
  }

  public async findTripInvitees(tripId: TripRecord['id']): Promise<UserRecord[]> {
    // TODO add 'friends' into the query when user friends functionality is ready
    const query = this.db.raw(
      `
      SELECT u.* FROM users u
      WHERE u.id NOT IN (
          SELECT t.invitee_id
          FROM trip_invites t
          WHERE t.trip_id = ?
      ) AND u.accepting_trip_invites = 'all'
    `,
      [tripId]
    );
    return extractRows(await query);
  }
}
