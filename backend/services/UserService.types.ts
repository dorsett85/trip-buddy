import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { IUserModel } from '../models/UserModel.types';
import { CreateTripInvitesArgs, UpdateUserArgs } from '../types/user';

export interface UserServiceDeps {
  user: UserRecord;
  userModel: IUserModel;
}

export interface IUserService {
  findOne(): Promise<UserRecord | undefined>;

  updateOne(updateUserInput: UpdateUserArgs): Promise<number>;

  possibleTripInvitees(tripId: TripRecord['id']): Promise<UserRecord[]>;

  createTripInvites(invites: CreateTripInvitesArgs): Promise<TripInviteRecord['id'][]>;
}
