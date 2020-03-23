import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import { ITripService, TripServiceDeps } from './TripService.types';
import { ITripModel } from '../models/TripModel.types';
import { IUserTripModel } from '../models/UserTripModel.types';
import { WhereArgs } from '../types/dbQueryUtils';
import { CreateTripArgs, PartialTripRecord, UpdateTripOmitIdArgs } from '../types/trip';

export default class TripService implements ITripService {
  private readonly user: UserRecord;

  private tripModel: ITripModel;

  private userTripModel: IUserTripModel;

  constructor(dependencies: TripServiceDeps) {
    this.user = dependencies.user;
    this.tripModel = dependencies.tripModel;
    this.userTripModel = dependencies.userTripModel;
  }

  public async createOne(createTripInput: CreateTripArgs): Promise<TripRecord> {
    // Create the new trip and add a record to the users_trips pivot table
    const trip = await this.tripModel.createOne(createTripInput);
    await this.userTripModel.createOne({ user_id: this.user.id, trip_id: trip.id });

    return trip;
  }

  public findOne(
    whereArgs: WhereArgs<PartialTripRecord>
  ): Promise<TripRecord | undefined> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripModel.findOne(whereArgs, userId);
  }

  public findMany(whereArgs?: WhereArgs<PartialTripRecord>): Promise<TripRecord[]> {
    const { id, role } = this.user;
    const userId = role === 'admin' ? undefined : id;
    return this.tripModel.findMany(whereArgs, userId);
  }

  public updateOne(
    updateTripInput: UpdateTripOmitIdArgs,
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
