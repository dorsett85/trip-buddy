import { UserRecord } from 'common/lib/types/user';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { TripRecord } from 'common/lib/types/trip';
import { IUserService, UserServiceDeps } from './UserService.types';
import { IUserModel } from '../models/UserModel.types';
import {
  CreateTripInvitesArgs,
  CreateTripInvitesWithInviterIdArgs,
  UpdateUserArgs
} from '../types/user';

export default class UserService implements IUserService {
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
