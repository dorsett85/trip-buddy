import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { UserRecord } from 'common/lib/types/user';
import {
  CreateTripInvitesWithInviterIdArgs,
  PartialTripInviteRecord,
  UpdateTripInviteOmitIdCreatedDateArgs
} from '../types/tripInvite';
import { extractRows } from '../utils/dbHelpers';
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
    invite: CreateTripInvitesWithInviterIdArgs
  ): Promise<TripInviteRecord[]> {
    const inviteIds = this.db(this.tableName)
      .insert(invite)
      .returning(['id']);
    return extractRows(await inviteIds);
  }

  public updateOne(
    updateArgs: UpdateTripInviteOmitIdCreatedDateArgs,
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
}
