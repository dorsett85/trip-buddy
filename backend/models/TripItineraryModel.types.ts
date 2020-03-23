import { TripItineraryRecord } from 'common/lib/types/tripItinerary';
import { UserRecord } from 'common/lib/types/user';
import { IBaseModel } from './BaseModel.types';
import {
  CreateTripItineraryArgs,
  PartialTripItineraryRecord,
  UpdateTripItineraryOmitIdCreatedDateArgs
} from '../types/tripItinerary';
import { WhereArgs } from '../types/dbQueryUtils';

export interface ITripItineraryModel extends IBaseModel {
  createOne(tripItinerary: CreateTripItineraryArgs): Promise<TripItineraryRecord>;

  findMany(
    whereArgs: WhereArgs<PartialTripItineraryRecord>,
    userId?: UserRecord['id']
  ): Promise<TripItineraryRecord[]>;

  updateOne(
    updateArgs: UpdateTripItineraryOmitIdCreatedDateArgs,
    whereArgs: WhereArgs<PartialTripItineraryRecord>,
    userId?: UserRecord['id']
  ): Promise<number>;

  deleteOne(
    itineraryId: TripItineraryRecord['id'],
    userId?: UserRecord['id']
  ): Promise<number>;
}
