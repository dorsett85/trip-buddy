import TripModel from '../models/Trip';
import UserTripModel from '../models/UserTrip';
import { TripServiceDeps } from './Trip.types';
import { TripRecord } from '../models/Trip.types';
import { UserRecord } from '../models/User.types';
// eslint-disable-next-line import/no-cycle
import { CreateTripInput, TripSchema } from '../schema/resolvers/trip.types';
import TripLegModel from '../models/TripLeg';

export default class TripService {
  private TripModel: typeof TripModel;

  private TripLegModel: typeof TripLegModel;

  private UserTripModel: typeof UserTripModel;

  constructor(dependencies: TripServiceDeps = {}) {
    this.TripModel = dependencies.TripModel || TripModel;
    this.TripLegModel = dependencies.TripLegModel || TripLegModel;
    this.UserTripModel = dependencies.UserTripModel || UserTripModel;
  }

  public getByUserId(userId: number): Promise<TripRecord[]> {
    return this.TripModel.findByUserId(userId);
  }

  public async createOne(
    createTripInput: CreateTripInput['input'],
    userId: UserRecord['id']
  ): Promise<TripSchema> {
    // Create the new trip and add a record to the users_trips pivot table
    const trip = await this.TripModel.createOne({ name: createTripInput.name });
    await this.UserTripModel.createOne({ user_id: userId, trip_id: trip.id });

    // Also create the initial trip leg
    const tripLeg = await this.TripLegModel.createOne({
      trip_id: trip.id,
      name: `${trip.name} Leg`,
      location: createTripInput.location,
      date_time: createTripInput.date_time
    });

    // Combine the trip and leg to appease the TripSchema
    const newTrip: TripSchema = {
      ...trip,
      legs: [tripLeg]
    }

    return newTrip;
  }

  public getTripLegs(tripId: TripRecord['id']) {
    return this.TripLegModel.findMany({ trip_id: tripId });
  }
}
