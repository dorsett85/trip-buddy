import { UserRecord } from 'common/lib/types/user';
import { TripItineraryRecord } from 'common/src/types/tripItinerary';
import { TripItineraryServiceDeps } from './TripItineraryService.types';
import { WhereArgs } from '../types/dbQueryUtils';
import {
  CreateTripItineraryArgs,
  PartialTripItineraryRecord,
  UpdateTripItineraryOmitIdCreatedDateArgs
} from '../types/tripItinerary';
import TripItineraryModel from '../models/TripItineraryModel';

export default class TripItineraryService {
  private readonly user: UserRecord;

  private tripItineraryModel: TripItineraryModel;

  constructor(dependencies: TripItineraryServiceDeps) {
    this.user = dependencies.user;
    this.tripItineraryModel = dependencies.tripItineraryModel;
  }

  public createOne(
    createTripItineraryInput: CreateTripItineraryArgs
  ): Promise<TripItineraryRecord> {
    return this.tripItineraryModel.createOne(createTripItineraryInput);
  }

  public findMany(
    whereArgs: WhereArgs<PartialTripItineraryRecord>
  ): Promise<TripItineraryRecord[]> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripItineraryModel.findMany(whereArgs, userId);
  }

  public updateOne(
    updateTripItineraryInput: UpdateTripItineraryOmitIdCreatedDateArgs,
    whereArgs: WhereArgs<PartialTripItineraryRecord>
  ): Promise<number> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripItineraryModel.updateOne(updateTripItineraryInput, whereArgs, userId);
  }

  public deleteOne(itineraryId: TripItineraryRecord['id']): Promise<number> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripItineraryModel.deleteOne(itineraryId, userId);
  }
}
