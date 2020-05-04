import { OmitId, RequireId } from 'common/lib/types/utils';
import { TripItineraryServiceDeps } from './TripItineraryService.types';
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
import { determineUserId } from '../utils/determineUserId';

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
    findManyArgs?: PartialTripItineraryRecord
  ): Promise<TripItineraryRecord[]> {
    const userId = determineUserId(this.user);
    return this.tripItineraryModel.findMany(findManyArgs, userId);
  }

  public updateOne(
    updateOneArgs: OmitId<UpdateTripItineraryInput>,
    updateWhere: RequireId<PartialTripItineraryRecord>
  ): Promise<number> {
    const userId = determineUserId(this.user);
    return this.tripItineraryModel.updateOne(updateOneArgs, updateWhere, userId);
  }

  public deleteOne(itineraryId: TripItineraryRecord['id']): Promise<number> {
    const userId = determineUserId(this.user);
    return this.tripItineraryModel.deleteOne(itineraryId, userId);
  }
}
