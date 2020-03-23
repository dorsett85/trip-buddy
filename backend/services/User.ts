import { UserRecord } from 'common/lib/types/user';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { TripRecord } from 'common/lib/types/trip';
import { UserServiceDeps } from './User.types';
import { CreateTripInvitesInput, UpdateUserInput } from '../schema/resolvers/user.types';
import {IUserModel} from "../models/UserModel.types";

export default class UserService {
  private readonly user: UserRecord;

  private userModel: IUserModel;

  constructor(dependencies: UserServiceDeps) {
    this.user = dependencies.user;
    this.userModel = dependencies.userModel;
  }

  public findOne(): Promise<UserRecord | undefined> {
    const { id } = this.user;
    return this.userModel.findOne({ items: { id } });
  }

  public updateOne(updateUserInput: UpdateUserInput['input']): Promise<number> {
    const { id } = this.user;
    return this.userModel.updateOne(updateUserInput, { items: { id } });
  }

  public possibleTripInvitees(tripId: TripRecord['id']): Promise<UserRecord[]> {
    return this.userModel.findTripInvitees(tripId);
  }

  public async createTripInvites(
    invites: CreateTripInvitesInput['input']
  ): Promise<TripInviteRecord['id'][]> {
    const invitesWithInvitee = invites.map(invite => {
      return {
        inviter_id: this.user.id,
        ...invite
      };
    });
    const tripInvites = await this.userModel.createTripInvites(invitesWithInvitee);
    return tripInvites.map(invite => invite.id);
  }
}
