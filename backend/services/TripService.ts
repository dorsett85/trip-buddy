import { OmitIdCreatedDate, RequireId, WithOptionalUserId } from 'common/lib/types/utils';
import { TripServiceDeps } from './TripService.types';
import TripModel from '../models/TripModel';
import UserTripModel from '../models/UserTripModel';
import { CreateTripInput } from '../schema/types/graphql';
import { UserRecord } from '../models/UserModel.types';
import { PartialTripRecord, TripRecord } from '../models/TripModel.types';
import { determineUserId } from '../utils/determineUserId';

export default class TripService {
  private readonly user: UserRecord;

  private tripModel: TripModel;

  private userTripModel: UserTripModel;

  constructor(dependencies: TripServiceDeps) {
    this.user = dependencies.user;
    this.tripModel = dependencies.tripModel;
    this.userTripModel = dependencies.userTripModel;
  }

  public async createOne(createTripInput: CreateTripInput): Promise<TripRecord> {
    // Create the new trip and add a record to the users_trips pivot table
    const trip = await this.tripModel.createOne(createTripInput);
    await this.userTripModel.createOne({ user_id: this.user.id, trip_id: trip.id });

    return trip;
  }

  public findOne(
    findOneArgs: WithOptionalUserId<PartialTripRecord>,
    joinUser = true
  ): Promise<TripRecord | undefined> {
    // eslint-disable-next-line prefer-const
    let { userId, ...partialTripRecord } = findOneArgs;
    if (!userId) {
      userId = determineUserId(this.user, joinUser);
    }

    return this.tripModel.findOne(partialTripRecord, userId);
  }

  public findMany(
    findManyArgs?: WithOptionalUserId<PartialTripRecord>,
    joinUser = true
  ): Promise<TripRecord[]> {
    let userId: number | undefined;
    let partialTripRecord: PartialTripRecord | undefined;
    if (findManyArgs) {
      ({ userId, ...partialTripRecord } = findManyArgs);
    }

    if (!userId) {
      userId = determineUserId(this.user, joinUser);
    }

    return this.tripModel.findMany(partialTripRecord, userId);
  }

  public updateOne(
    updateOneArgs: OmitIdCreatedDate<PartialTripRecord>,
    updateWhere: RequireId<PartialTripRecord>
  ): Promise<number> {
    const userId = determineUserId(this.user);
    return this.tripModel.updateOne(updateOneArgs, updateWhere, userId);
  }

  public deleteOne(tripId: TripRecord['id']): Promise<number> {
    const userId = determineUserId(this.user);
    return this.tripModel.deleteOne(tripId, userId);
  }
}
