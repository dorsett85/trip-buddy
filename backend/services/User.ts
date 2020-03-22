import { UserRecord } from 'common/lib/types/user';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { TripRecord } from 'common/lib/types/trip';
import UserModel from '../models/User';
import { UserServiceDeps } from './User.types';
// eslint-disable-next-line import/no-cycle
import { CreateTripInvitesInput, UpdateUserInput } from '../schema/resolvers/user.types';

export default class UserService {
  private readonly user: UserRecord;

  private UserModel: typeof UserModel;

  constructor(dependencies: UserServiceDeps) {
    this.user = dependencies.user;
    this.UserModel = dependencies.UserModel;
  }

  public findOne(): Promise<UserRecord | undefined> {
    const { id } = this.user;
    return this.UserModel.findOne({ items: { id } });
  }

  public updateOne(updateUserInput: UpdateUserInput['input']): Promise<number> {
    const { id } = this.user;
    return this.UserModel.updateOne(updateUserInput, { items: { id } });
  }

  public possibleTripInvitees(tripId: TripRecord['id']): Promise<UserRecord[]> {
    return this.UserModel.findTripInvitees(tripId);
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
    const tripInvites = await this.UserModel.createTripInvites(invitesWithInvitee);
    return tripInvites.map(invite => invite.id);
  }
}
