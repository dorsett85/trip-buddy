import { TripRecord } from 'common/lib/types/trip';
import { UserRecord } from 'common/lib/types/user';
import { IBaseModel } from './BaseModel.types';
import { OmitId, WhereArgs } from '../types';

export interface ITripModel extends IBaseModel {
  createOne(trip: Partial<TripRecord>): Promise<TripRecord>;

  findOne(
    whereArgs: WhereArgs<Partial<TripRecord>>,
    userId?: UserRecord['id']
  ): Promise<TripRecord | undefined>;

  findMany(
    whereArgs?: WhereArgs<Partial<TripRecord>>,
    userId?: UserRecord['id']
  ): Promise<TripRecord[]>;

  updateOne(
    updateArgs: OmitId<Partial<TripRecord>>,
    whereArgs: WhereArgs<Partial<TripRecord>>,
    userId?: UserRecord['id']
  ): Promise<number>;

  deleteOne(tripId: TripRecord['id'], userId?: UserRecord['id']): Promise<number>;
}
