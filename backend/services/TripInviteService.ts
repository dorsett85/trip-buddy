import { PartialTripInviteRecord, TripInviteRecord } from 'common/lib/types/tripInvite';
import { UserRecord } from 'common/lib/types/user';
import { PubSub } from 'apollo-server-express';
import { TripRecord } from 'common/lib/types/trip';
import { OmitId } from 'common/lib/types/utils';
import TripInviteModel from '../models/TripInviteModel';
import { TripInviteServiceDeps } from './TripInviteService.types';
import { WhereArgs } from '../types/dbQueryUtils';
import { CreateTripInviteInput, UpdateTripInviteInput } from '../schema/types/graphql';

export default class TripInviteService {
  private readonly user: UserRecord;

  private readonly pubsub: PubSub;

  private tripInviteModel: TripInviteModel;

  constructor(dependencies: TripInviteServiceDeps) {
    this.user = dependencies.user;
    this.pubsub = dependencies.pubsub;
    this.tripInviteModel = dependencies.tripInviteModel;
  }

  public async createMany(
    invites: CreateTripInviteInput[]
  ): Promise<TripInviteRecord['id'][]> {
    const invitesWithInviterId = invites.map(invite => {
      return {
        inviter_id: this.user.id,
        ...invite
      };
    });
    const tripInvites = await this.tripInviteModel.createMany(invitesWithInviterId);

    // Publish the results so clients receive their subscription trip invites
    this.pubsub.publish('tripInviteCreated', tripInvites);
    return tripInvites.map(invite => invite.id);
  }

  public findMany(): Promise<TripInviteRecord[]> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripInviteModel.findMany(userId);
  }

  public updateOne(
    updateTripInviteInput: OmitId<UpdateTripInviteInput>,
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
