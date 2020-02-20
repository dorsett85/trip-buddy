import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import TripModel from '../models/Trip';
import UserTripModel from '../models/UserTrip';
import { TripServiceDeps } from './Trip.types';
// eslint-disable-next-line import/no-cycle
import { CreateTripInput, UpdateTripInput } from '../schema/resolvers/trip.types';
import { OmitId, WhereArgs } from '../types';

export default class TripService {
  private readonly user: UserRecord;

  private TripModel: typeof TripModel;

  private UserTripModel: typeof UserTripModel;

  constructor(dependencies: TripServiceDeps) {
    this.user = dependencies.user;
    this.TripModel = dependencies.TripModel;
    this.UserTripModel = dependencies.UserTripModel;
  }

  public async createOne(createTripInput: CreateTripInput['input']): Promise<TripRecord> {
    // Create the new trip and add a record to the users_trips pivot table
    const trip = await this.TripModel.createOne(createTripInput);
    await this.UserTripModel.createOne({ user_id: this.user.id, trip_id: trip.id });

    return trip;
  }

  public findOne(
    whereArgs: WhereArgs<Partial<TripRecord>>
  ): Promise<TripRecord | undefined> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.TripModel.findOne(whereArgs, userId);
  }

  public findMany(whereArgs?: WhereArgs<Partial<TripRecord>>): Promise<TripRecord[]> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.TripModel.findMany(whereArgs, userId);
  }

  public updateOne(
    updateTripInput: OmitId<UpdateTripInput['input']>,
    whereArgs: WhereArgs<Partial<TripRecord>>
  ): Promise<number> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.TripModel.updateOne(updateTripInput, whereArgs, userId);
  }

  public deleteOne(tripId: TripRecord['id']): Promise<number> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.TripModel.deleteOne(tripId, userId);
  }
}
