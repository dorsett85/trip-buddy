import { UserRecord } from 'common/lib/types/user';
import { TripItineraryRecord } from 'common/src/types/tripItinerary';
// eslint-disable-next-line import/no-cycle
import {
  UpdateTripItineraryInput,
  CreateTripItineraryInput
} from '../schema/resolvers/trip.types';
import TripItineraryModel from '../models/TripItinerary';
import { OmitId, WhereArgs } from '../types';
import { TripItineraryServiceDeps } from './TripItinerary.types';

export default class TripItineraryService {
  private readonly user: UserRecord;

  private TripItineraryModel: typeof TripItineraryModel;

  constructor(dependencies: TripItineraryServiceDeps) {
    this.user = dependencies.user;
    this.TripItineraryModel = dependencies.TripItineraryModel;
  }

  public createOne(
    createTripItineraryInput: CreateTripItineraryInput['input']
  ): Promise<TripItineraryRecord> {
    return this.TripItineraryModel.createOne(createTripItineraryInput);
  }

  public findMany(
    whereArgs: WhereArgs<Partial<TripItineraryRecord>>
  ): Promise<TripItineraryRecord[]> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.TripItineraryModel.findMany(whereArgs, userId);
  }

  public updateOne(
    updateTripItineraryInput: OmitId<UpdateTripItineraryInput['input']>,
    whereArgs: WhereArgs<Partial<TripItineraryRecord>>
  ): Promise<number> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.TripItineraryModel.updateOne(updateTripItineraryInput, whereArgs, userId);
  }

  public deleteOne(
    itineraryId: TripItineraryRecord['id']
  ): Promise<number> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.TripItineraryModel.deleteOne(itineraryId, userId);
  }
}
