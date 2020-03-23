import { UserRecord } from 'common/lib/types/user';
import { TripItineraryRecord } from 'common/src/types/tripItinerary';
import {
  UpdateTripItineraryInput,
  CreateTripItineraryInput
} from '../schema/resolvers/trip.types';
import { OmitId } from '../types';
import { TripItineraryServiceDeps } from './TripItinerary.types';
import { ITripItineraryModel } from '../models/TripItineraryModel.types';
import { WhereArgs } from '../types/dbQueryUtils';

export default class TripItineraryService {
  private readonly user: UserRecord;

  private tripItineraryModel: ITripItineraryModel;

  constructor(dependencies: TripItineraryServiceDeps) {
    this.user = dependencies.user;
    this.tripItineraryModel = dependencies.tripItineraryModel;
  }

  public createOne(
    createTripItineraryInput: CreateTripItineraryInput['input']
  ): Promise<TripItineraryRecord> {
    return this.tripItineraryModel.createOne(createTripItineraryInput);
  }

  public findMany(
    whereArgs: WhereArgs<Partial<TripItineraryRecord>>
  ): Promise<TripItineraryRecord[]> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripItineraryModel.findMany(whereArgs, userId);
  }

  public updateOne(
    updateTripItineraryInput: OmitId<UpdateTripItineraryInput['input']>,
    whereArgs: WhereArgs<Partial<TripItineraryRecord>>
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
