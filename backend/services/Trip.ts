import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import { TripServiceDeps } from './Trip.types';
// eslint-disable-next-line import/no-cycle
import { CreateTripInput, UpdateTripInput } from '../schema/resolvers/trip.types';
import { OmitId, WhereArgs } from '../types';
import { ITripModel } from '../models/TripModel.types';
import {IUserTripModel} from "../models/UserTripModel.types";

export default class TripService {
  private readonly user: UserRecord;

  private tripModel: ITripModel;

  private userTripModel: IUserTripModel;

  constructor(dependencies: TripServiceDeps) {
    this.user = dependencies.user;
    this.tripModel = dependencies.tripModel;
    this.userTripModel = dependencies.userTripModel;
  }

  public async createOne(createTripInput: CreateTripInput['input']): Promise<TripRecord> {
    // Create the new trip and add a record to the users_trips pivot table
    const trip = await this.tripModel.createOne(createTripInput);
    await this.userTripModel.createOne({ user_id: this.user.id, trip_id: trip.id });

    return trip;
  }

  public findOne(
    whereArgs: WhereArgs<Partial<TripRecord>>
  ): Promise<TripRecord | undefined> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripModel.findOne(whereArgs, userId);
  }

  public findMany(whereArgs?: WhereArgs<Partial<TripRecord>>): Promise<TripRecord[]> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripModel.findMany(whereArgs, userId);
  }

  public updateOne(
    updateTripInput: OmitId<UpdateTripInput['input']>,
    whereArgs: WhereArgs<Partial<TripRecord>>
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
