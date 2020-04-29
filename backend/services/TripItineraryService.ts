import { OmitId } from 'common/lib/types/utils';
import { TripItineraryServiceDeps } from './TripItineraryService.types';
import { WhereArgs } from '../types/dbQueryUtils';
import TripItineraryModel from '../models/TripItineraryModel';
import {
  CreateTripItineraryInput,
  UpdateTripItineraryInput
} from '../schema/types/graphql';
import { UserRecord } from '../models/UserModel.types';
import {
  PartialTripItineraryRecord,
  TripItineraryRecord
} from '../models/TripItineraryModel.types';

export default class TripItineraryService {
  private readonly user: UserRecord;

  private tripItineraryModel: TripItineraryModel;

  constructor(dependencies: TripItineraryServiceDeps) {
    this.user = dependencies.user;
    this.tripItineraryModel = dependencies.tripItineraryModel;
  }

  public createOne(
    createTripItineraryInput: CreateTripItineraryInput
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
    updateTripItineraryInput: OmitId<UpdateTripItineraryInput>,
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
