import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { CreateTripInvitesWithInviterIdArgs } from '../types/trip';
import { extractRows } from '../utils/dbHelpers';
import BaseModel from './BaseModel';

export default class TripItineraryModel extends BaseModel {
  public async createTripInvites(
    invite: CreateTripInvitesWithInviterIdArgs
  ): Promise<TripInviteRecord[]> {
    const inviteIds = this.db('trip_invites')
      .insert(invite)
      .returning(['id']);
    return extractRows(await inviteIds);
  }
}
