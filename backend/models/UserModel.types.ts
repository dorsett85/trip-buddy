import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { IBaseModel } from './BaseModel.types';
import {
  CreateTripInvitesWithInviterIdArgs,
  CreateUserArgs,
  PartialUserRecord,
  UpdateUserArgs
} from '../types/user';
import { WhereArgs } from '../types/dbQueryUtils';

export interface IUserModel extends IBaseModel {
  createOne(user: CreateUserArgs): Promise<UserRecord>;

  findOne(whereArgs: WhereArgs<PartialUserRecord>): Promise<UserRecord | undefined>;

  updateOne(
    updateArgs: UpdateUserArgs,
    whereArgs: WhereArgs<PartialUserRecord>
  ): Promise<number>;

  findTripInvitees(tripId: TripRecord['id']): Promise<UserRecord[]>;

  createTripInvites(
    invite: CreateTripInvitesWithInviterIdArgs
  ): Promise<TripInviteRecord[]>;
}
