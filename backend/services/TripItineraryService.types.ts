import { UserRecord } from 'common/lib/types/user';
import { TripItineraryRecord } from 'common/lib/types/tripItinerary';
import { ITripItineraryModel } from '../models/TripItineraryModel.types';
import {
  CreateTripItineraryArgs,
  PartialTripItineraryRecord,
  UpdateTripItineraryOmitIdArgs
} from '../types/tripItinerary';
import { WhereArgs } from '../types/dbQueryUtils';

export interface TripItineraryServiceDeps {
  user: UserRecord;
  tripItineraryModel: ITripItineraryModel;
}

export interface ITripItineraryService {
  createOne(
    createTripItineraryInput: CreateTripItineraryArgs
  ): Promise<TripItineraryRecord>;

  findMany(
    whereArgs: WhereArgs<PartialTripItineraryRecord>
  ): Promise<TripItineraryRecord[]>;

  updateOne(
    updateTripItineraryInput: UpdateTripItineraryOmitIdArgs,
    whereArgs: WhereArgs<PartialTripItineraryRecord>
  ): Promise<number>;

  deleteOne(itineraryId: TripItineraryRecord['id']): Promise<number>;
}
