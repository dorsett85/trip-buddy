import { OmitIdCreatedDate } from 'common/lib/types/utils';
import { TripServiceDeps } from './TripService.types';
import { WhereArgs } from '../types/dbQueryUtils';
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
    whereArgs: WhereArgs<PartialTripRecord>,
    restrictUser = true
  ): Promise<TripRecord | undefined> {
    const { id, role } = this.user;
    // If the findOne method is called from within a nested gql query, we can safely
    // query just the trip table without needing to join another table to get the user
    // id. If the 'restrictUser' argument is false, the tripModel.findOne method will
    // query the trip table directly.
    const userId = role === 'admin' || !restrictUser ? undefined : id;
    return this.tripModel.findOne(whereArgs, userId);
  }

  public findMany(whereArgs?: WhereArgs<PartialTripRecord>): Promise<TripRecord[]> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripModel.findMany(whereArgs, userId);
  }

  public updateOne(
    updateTripInput: OmitIdCreatedDate<PartialTripRecord>,
    whereArgs: WhereArgs<PartialTripRecord>
  ): Promise<number> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripModel.updateOne(updateTripInput, whereArgs, userId);
  }

  public deleteOne(tripId: TripRecord['id']): Promise<number> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripModel.deleteOne(tripId, userId);
  }
}
