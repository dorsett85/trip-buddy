import TripModel from '../models/Trip';
import UserTripModel from '../models/UserTrip';
import { TripServiceDeps } from './Trip.types';
import { TripRecord } from '../models/Trip.types';
import { UserRecord } from '../models/User.types';

export default class TripService {
  private TripModel: typeof TripModel;

  private UserTripModel: typeof UserTripModel;

  constructor(dependencies: TripServiceDeps = {}) {
    this.TripModel = dependencies.TripModel || TripModel;
    this.UserTripModel = dependencies.UserTripModel || UserTripModel;
  }

  public async getByUserId(userId: number): Promise<TripRecord[]> {
    return this.TripModel.findByUserId(userId);
  }

  public async createOne(
    trip: Partial<TripRecord>,
    userId: UserRecord['id']
  ): Promise<TripRecord> {
    // Create the new trip, but also need to add a record to the users_trips pivot table
    const newTrip = await this.TripModel.createOne(trip);
    await this.UserTripModel.createOne({ user_id: userId, trip_id: newTrip.id });
    return newTrip;
  }
}
