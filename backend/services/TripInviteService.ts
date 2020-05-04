import { PubSub } from 'apollo-server-express';
import { OmitId, RequireId } from 'common/lib/types/utils';
import TripInviteModel from '../models/TripInviteModel';
import { TripInviteServiceDeps } from './TripInviteService.types';
import { CreateTripInviteInput, UpdateTripInviteInput } from '../schema/types/graphql';
import { UserRecord } from '../models/UserModel.types';
import {
  PartialTripInviteRecord,
  TripInviteRecord
} from '../models/TripInviteModel.types';
import { TripRecord } from '../models/TripModel.types';
import { determineUserId } from '../utils/determineUserId';

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
    const userId = determineUserId(this.user);
    return this.tripInviteModel.findMany(userId);
  }

  public updateOne(
    updateOneArgs: OmitId<UpdateTripInviteInput>,
    updateWhere: RequireId<PartialTripInviteRecord>
  ): Promise<number> {
    const userId = determineUserId(this.user);
    return this.tripInviteModel.updateOne(updateOneArgs, updateWhere, userId);
  }

  public acceptOne(id: TripInviteRecord['id']): Promise<TripRecord> {
    const userId = determineUserId(this.user);
    return this.tripInviteModel.acceptOne(id, userId);
  }
}
