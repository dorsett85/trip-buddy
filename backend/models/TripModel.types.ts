import { TripRecord } from 'common/lib/types/trip';
import { UserRecord } from 'common/lib/types/user';
import { IBaseModel } from './BaseModel.types';
import { WhereArgs } from '../types/dbQueryUtils';
import { CreateTripArgs, PartialTripRecord, UpdateTripOmitIdArgs } from '../types/trip';

export interface ITripModel extends IBaseModel {
  createOne(trip: CreateTripArgs): Promise<TripRecord>;

  findOne(
    whereArgs: WhereArgs<PartialTripRecord>,
    userId?: UserRecord['id']
  ): Promise<TripRecord | undefined>;

  findMany(
    whereArgs?: WhereArgs<PartialTripRecord>,
    userId?: UserRecord['id']
  ): Promise<TripRecord[]>;

  updateOne(
    updateArgs: UpdateTripOmitIdArgs,
    whereArgs: WhereArgs<PartialTripRecord>,
    userId?: UserRecord['id']
  ): Promise<number>;

  deleteOne(tripId: TripRecord['id'], userId?: UserRecord['id']): Promise<number>;
}
