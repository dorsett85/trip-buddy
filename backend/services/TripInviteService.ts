import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { UserRecord } from 'common/lib/types/user';
import {CreateTripInvitesArgs, CreateTripInvitesWithInviterIdArgs } from '../types/trip';
import TripInviteModel from '../models/TripInviteModel';
import { TripInviteServiceTypes } from './TripInviteService.types';

export default class TripService {
  private readonly user: UserRecord;

  private tripInviteModel: TripInviteModel;

  constructor(dependencies: TripInviteServiceTypes) {
    this.user = dependencies.user;
    this.tripInviteModel = dependencies.tripInviteModel;
  }

  public findMany(): Promise<TripInviteRecord[]> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripInviteModel.findMany(userId);
  }

  public async createMany(
    invites: CreateTripInvitesArgs
  ): Promise<TripInviteRecord['id'][]> {
    const invitesWithInviterId: CreateTripInvitesWithInviterIdArgs = invites.map(
      invite => {
        return {
          inviter_id: this.user.id,
          ...invite
        };
      }
    );
    const tripInvites = await this.tripInviteModel.createMany(
      invitesWithInviterId
    );
    return tripInvites.map(invite => invite.id);
  }
}
