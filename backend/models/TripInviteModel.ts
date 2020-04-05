import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { UserRecord } from 'common/lib/types/user';
import { CreateTripInvitesWithInviterIdArgs } from '../types/trip';
import { extractRows } from '../utils/dbHelpers';
import BaseModel from './BaseModel';
import { WhereArgGroup } from '../types/dbQueryUtils';

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
}
