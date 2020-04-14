import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { UserRecord } from 'common/lib/types/user';
import {
  CreateTripInvitesArgs,
  CreateTripInvitesWithInviterIdArgs,
  PartialTripInviteRecord, UpdateTripInviteArgs,
  UpdateTripInviteOmitIdArgs
} from '../types/tripInvite';
import TripInviteModel from '../models/TripInviteModel';
import { TripInviteServiceTypes } from './TripInviteService.types';
import { WhereArgs } from '../types/dbQueryUtils';
import {TripRecord} from "common/lib/types/trip";

export default class TripService {
  private readonly user: UserRecord;

  private tripInviteModel: TripInviteModel;

  constructor(dependencies: TripInviteServiceTypes) {
    this.user = dependencies.user;
    this.tripInviteModel = dependencies.tripInviteModel;
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
    const tripInvites = await this.tripInviteModel.createMany(invitesWithInviterId);
    return tripInvites.map(invite => invite.id);
  }

  public findMany(): Promise<TripInviteRecord[]> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripInviteModel.findMany(userId);
  }

  public updateOne(
    updateTripInviteInput: UpdateTripInviteOmitIdArgs,
    whereArgs: WhereArgs<PartialTripInviteRecord>
  ): Promise<number> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripInviteModel.updateOne(updateTripInviteInput, whereArgs, userId);
  }
  
  public acceptOne(inviteId: TripInviteRecord['id']): Promise<TripRecord> {
    const whereVals = {
      inviteId,
      userId: this.user.role === 'admin' ? undefined : this.user.id
    };
    return this.tripInviteModel.acceptOne(whereVals);
  }
}
