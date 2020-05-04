import { OmitId, RequireId } from 'common/lib/types/utils';
import { extractRow, extractRows } from '../utils/dbHelpers';
import BaseModel from './BaseModel';
import { WhereArgGroup } from '../types/dbQueryUtils';
import { CreateTripInviteInput, UpdateTripInviteInput } from '../schema/types/graphql';
import { UserRecord } from './UserModel.types';
import { PartialTripInviteRecord, TripInviteRecord } from './TripInviteModel.types';
import { TripRecord } from './TripModel.types';

export default class TripItineraryModel extends BaseModel {
  public async createMany(
    invite: (CreateTripInviteInput & {
      // eslint-disable-next-line camelcase
      inviter_id: UserRecord['id'];
    })[]
  ): Promise<TripInviteRecord[]> {
    const inviteIds = this.db(this.tableName).insert(invite);
    return extractRows(await inviteIds);
  }

  public async findMany(userId?: UserRecord['id']): Promise<TripInviteRecord[]> {
    if (!userId) {
      return this.baseFindMany();
    }
    const whereArgs: WhereArgGroup<Pick<TripInviteRecord, 'invitee_id'>> = {
      items: { invitee_id: userId }
    };
    return this.baseFindMany<TripInviteRecord>(whereArgs);
  }

  public updateOne(
    updateArgs: OmitId<UpdateTripInviteInput>,
    updateWhere: RequireId<PartialTripInviteRecord>,
    userId?: UserRecord['id']
  ): Promise<number> {
    const whereArgs: WhereArgGroup<RequireId<PartialTripInviteRecord>> = {
      items: updateWhere
    };

    if (!userId) {
      return this.baseUpdateOne(updateArgs, whereArgs);
    }

    // For non-admin users we want them to only update trip invites where
    // they are the invitee.
    const inviteeIdWhereGroup: WhereArgGroup<Pick<TripInviteRecord, 'invitee_id'>> = {
      items: { invitee_id: userId }
    };
    const whereArgsWithInviteeId: WhereArgGroup<PartialTripInviteRecord>[] = [
      inviteeIdWhereGroup,
      whereArgs
    ];

    return this.baseUpdateOne(updateArgs, whereArgsWithInviteeId);
  }

  public async acceptOne(
    id: TripInviteRecord['id'],
    inviteeId?: TripInviteRecord['invitee_id']
  ): Promise<TripRecord> {
    const values = [id];

    // Only add invitee filter if userId is defined
    let inviteeFilter = '';
    if (inviteeId) {
      inviteeFilter = 'AND ti.invitee_id = ?';
      values.push(inviteeId);
    }

    // We'll need to do three thing with this query, update the trip_invites table,
    // insert a record into the users_trips table, and select from the trip that
    // the user just accepted an invite for.
    const query = this.db.raw(
      `
      WITH upd AS (
          UPDATE trip_invites ti
          SET status = 'accepted'
          WHERE ti.id = ? ${inviteeFilter}
          RETURNING ti.invitee_id, ti.trip_id 
      ), ins AS (
          INSERT  INTO users_trips AS ut (user_id, trip_id)
          SELECT upd.invitee_id, upd.trip_id
          FROM upd
          RETURNING ut.trip_id
      )
      SELECT * FROM trips
      WHERE id = (
          SELECT ins.trip_id
          FROM ins
      );
    `,
      values
    );
    return extractRow<TripRecord>(await query);
  }
}
