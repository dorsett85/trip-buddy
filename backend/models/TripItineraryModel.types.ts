import { TripItineraryRecord } from 'common/lib/types/tripItinerary';
import { UserRecord } from 'common/lib/types/user';
import { IBaseModel } from './BaseModel.types';
import {
  CreateTripItineraryArgs,
  PartialTripItineraryRecord,
  UpdateTripItineraryOmitIdArgs
} from '../types/tripItinerary';
import { WhereArgs } from '../types/dbQueryUtils';

export interface ITripItineraryModel extends IBaseModel {
  createOne(tripItinerary: CreateTripItineraryArgs): Promise<TripItineraryRecord>;

  findMany(
    whereArgs: WhereArgs<PartialTripItineraryRecord>,
    userId?: UserRecord['id']
  ): Promise<TripItineraryRecord[]>;

  updateOne(
    updateArgs: UpdateTripItineraryOmitIdArgs,
    whereArgs: WhereArgs<PartialTripItineraryRecord>,
    userId?: UserRecord['id']
  ): Promise<number>;

  deleteOne(
    itineraryId: TripItineraryRecord['id'],
    userId?: UserRecord['id']
  ): Promise<number>;
}
