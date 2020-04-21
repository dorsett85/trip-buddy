import { PartialTripInviteRecord, TripInviteRecord } from 'common/lib/types/tripInvite';
import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import {
  CreateTripInvites,
  UpdateTripInviteArgs
} from 'common/lib/types/gqlSchema/tripInvite';
import { OmitId } from 'common/lib/types/utils';
import { extractRow, extractRows } from '../utils/dbHelpers';
import BaseModel from './BaseModel';
import { WhereArgGroup, WhereArgs } from '../types/dbQueryUtils';

export default class TripItineraryModel extends BaseModel {
  public async findMany(userId?: UserRecord['id']): Promise<TripInviteRecord[]> {
    if (!userId) {
      return this.baseFindMany();
    }
    const whereArgs: WhereArgGroup = {
      items: {
        invitee_id: userId
      }
    };
    return this.baseFindMany(whereArgs);
  }

  public async createMany(
    invite: (CreateTripInvites & {
      // eslint-disable-next-line camelcase
      inviter_id: UserRecord['id'];
    })[]
  ): Promise<TripInviteRecord[]> {
    const inviteIds = this.db(this.tableName).insert(invite);
    return extractRows(await inviteIds);
  }

  public updateOne(
    updateArgs: OmitId<UpdateTripInviteArgs>,
    whereArgs: WhereArgs<PartialTripInviteRecord>,
    userId?: UserRecord['id']
  ): Promise<number> {
    if (!userId) {
      return this.baseUpdateOne(updateArgs, whereArgs);
    }

    // For non-admin users we want them to only update trip invites where
    // they are the invitee.
    const inviteeIdWhereGroup: WhereArgs<PartialTripInviteRecord> = {
      items: { invitee_id: userId }
    };
    const whereArgsWithInviteeId: WhereArgs = Array.isArray(whereArgs)
      ? [inviteeIdWhereGroup, ...whereArgs]
      : [inviteeIdWhereGroup, whereArgs];
    return this.baseUpdateOne(updateArgs, whereArgsWithInviteeId);
  }

  public async acceptOne({
    inviteId,
    userId
  }: {
    inviteId: TripInviteRecord['id'];
    userId?: TripInviteRecord['invitee_id'];
  }): Promise<TripRecord> {
    const values = [inviteId];

    // Only add invitee filter if userId is defined
    let inviteeFilter = '';
    if (userId) {
      inviteeFilter = 'AND ti.invitee_id = ?';
      values.push(userId);
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
