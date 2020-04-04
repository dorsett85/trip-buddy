import { UserRecord } from 'common/lib/types/user';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { TripRecord } from 'common/lib/types/trip';
import { UserServiceDeps } from './UserService.types';
import {
  CreateTripInvitesArgs,
  CreateTripInvitesWithInviterIdArgs,
  UpdateUserArgs
} from '../types/user';
import UserModel from '../models/UserModel';
import {WhereArgGroup} from "../types/dbQueryUtils";

export default class UserService {
  private readonly user: UserRecord;

  private userModel: UserModel;

  constructor(dependencies: UserServiceDeps) {
    this.user = dependencies.user;
    this.userModel = dependencies.userModel;
  }
  
  public async verifyEmail(token: string): Promise<number> {
    return this.userModel.verifyEmail(token, this.user);
  }

  public findOne(): Promise<UserRecord | undefined> {
    const { id } = this.user;
    return this.userModel.findOne({ items: { id } });
  }

  public updateOne(updateUserInput: UpdateUserArgs): Promise<number> {
    const { id } = this.user;
    return this.userModel.updateOne(updateUserInput, { items: { id } });
  }

  public possibleTripInvitees(tripId: TripRecord['id']): Promise<UserRecord[]> {
    return this.userModel.findTripInvitees(tripId);
  }

  public async createTripInvites(
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
    const tripInvites = await this.userModel.createTripInvites(invitesWithInviterId);
    return tripInvites.map(invite => invite.id);
  }
}
