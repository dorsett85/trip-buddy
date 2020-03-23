import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import { ITripModel } from '../models/TripModel.types';
import { IUserTripModel } from '../models/UserTripModel.types';
import { WhereArgs } from '../types/dbQueryUtils';
import { CreateTripArgs, PartialTripRecord, UpdateTripArgsOmitId } from '../types/trip';

export interface TripServiceDeps {
  user: UserRecord;
  tripModel: ITripModel;
  userTripModel: IUserTripModel;
}

export interface ITripService {
  createOne(createTripInput: CreateTripArgs): Promise<TripRecord>;

  findOne(whereArgs: WhereArgs<PartialTripRecord>): Promise<TripRecord | undefined>;

  findMany(whereArgs?: WhereArgs<PartialTripRecord>): Promise<TripRecord[]>;

  updateOne(
    updateTripInput: UpdateTripArgsOmitId,
    whereArgs: WhereArgs<PartialTripRecord>
  ): Promise<number>;

  deleteOne(tripId: TripRecord['id']): Promise<number>;
}
