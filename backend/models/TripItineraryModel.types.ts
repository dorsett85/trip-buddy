import { TripItineraryRecord } from 'common/lib/types/tripItinerary';
import { UserRecord } from 'common/lib/types/user';
import { OmitId, WhereArgs } from '../types';
import { IBaseModel } from './BaseModel.types';

export interface ITripItineraryModel extends IBaseModel {
  createOne(tripItinerary: Partial<TripItineraryRecord>): Promise<TripItineraryRecord>;

  findMany(
    whereArgs: WhereArgs<Partial<TripItineraryRecord>>,
    userId?: UserRecord['id']
  ): Promise<TripItineraryRecord[]>;

  updateOne(
    updateArgs: OmitId<Partial<TripItineraryRecord>>,
    whereArgs: WhereArgs<Partial<TripItineraryRecord>>,
    userId?: UserRecord['id']
  ): Promise<number>;

  deleteOne(
    itineraryId: TripItineraryRecord['id'],
    userId?: UserRecord['id']
  ): Promise<number>;
}
