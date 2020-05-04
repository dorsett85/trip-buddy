import { OmitIdCreatedDate, RequireId, WithOptionalUserId } from 'common/lib/types/utils';
import { TripServiceDeps } from './TripService.types';
import TripModel from '../models/TripModel';
import UserTripModel from '../models/UserTripModel';
import { CreateTripInput } from '../schema/types/graphql';
import { UserRecord } from '../models/UserModel.types';
import { PartialTripRecord, TripRecord } from '../models/TripModel.types';

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
    const { id, role } = this.user;
    // If userId is undefined we can query the trip table directly (if joinUser
    // arg is false) without needing to join another table to get the user id.
    // This is useful inside of a nested query requesting a trip where we don't
    // need to worry about admin access.
    // Outside of a nested query we still need the check for admin privileges to
    // see if the user is restricted or not.
    if (!userId) {
      userId = !joinUser || role === 'admin' ? undefined : id;
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
    const { id, role } = this.user;

    if (!userId) {
      userId = !joinUser || role === 'admin' ? undefined : id;
    }

    return this.tripModel.findMany(partialTripRecord, userId);
  }

  public updateOne(
    updateOneArgs: OmitIdCreatedDate<PartialTripRecord>,
    updateWhere: RequireId<PartialTripRecord>
  ): Promise<number> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripModel.updateOne(updateOneArgs, updateWhere, userId);
  }

  public deleteOne(tripId: TripRecord['id']): Promise<number> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripModel.deleteOne(tripId, userId);
  }
}
