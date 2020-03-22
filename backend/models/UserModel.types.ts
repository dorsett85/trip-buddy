import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { WhereArgs } from '../types';
import { IBaseModel } from './BaseModel.types';

export interface IUserModel extends IBaseModel {
  createOne(user: Partial<UserRecord>): Promise<UserRecord>;

  findOne(whereArgs: WhereArgs<Partial<UserRecord>>): Promise<UserRecord | undefined>;

  updateOne(
    updateArgs: Partial<UserRecord>,
    whereArgs: WhereArgs<Partial<UserRecord>>
  ): Promise<number>;

  findTripInvitees(tripId: TripRecord['id']): Promise<UserRecord[]>;

  createTripInvites(invite: Partial<TripInviteRecord>[]): Promise<TripInviteRecord[]>;
}
