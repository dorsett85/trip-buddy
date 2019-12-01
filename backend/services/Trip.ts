import TripModel from '../models/Trip';
import UserTripModel from '../models/UserTrip';
import { TripServiceDeps } from './Trip.types';
import { TripRecord } from '../models/Trip.types';
import { UserRecord } from '../models/User.types';
// eslint-disable-next-line import/no-cycle
import {
  CreateTripInput,
  TripSchema,
  UpdateTripInput
} from '../schema/resolvers/trip.types';
import TripLegModel from '../models/TripLeg';
import { TripLegRecord } from '../models/TripLeg.types';

export default class TripService {
  private TripModel: typeof TripModel;

  private TripLegModel: typeof TripLegModel;

  private UserTripModel: typeof UserTripModel;

  constructor(dependencies: TripServiceDeps = {}) {
    this.TripModel = dependencies.TripModel || TripModel;
    this.TripLegModel = dependencies.TripLegModel || TripLegModel;
    this.UserTripModel = dependencies.UserTripModel || UserTripModel;
  }

  public findByUserId(userId: number): Promise<TripRecord[]> {
    return this.TripModel.findByUserId(userId);
  }

  public async createOne(
    createTripInput: CreateTripInput['input'],
    userId: UserRecord['id']
  ): Promise<TripSchema> {
    // Create the new trip and add a record to the users_trips pivot table
    const trip = await this.TripModel.createOne({
      name: createTripInput.name,
      description: createTripInput.description
    });
    await this.UserTripModel.createOne({ user_id: userId, trip_id: trip.id });

    // Also create the initial trip leg
    const tripLeg = await this.TripLegModel.createOne({
      trip_id: trip.id,
      name: 'Leg 1',
      location: createTripInput.location,
      date_time: createTripInput.date_time
    });

    // Combine the trip and leg to appease the TripSchema
    const newTrip: TripSchema = {
      ...trip,
      legs: [tripLeg]
    };

    return newTrip;
  }

  public updateOne(
    updateTripInput: Omit<UpdateTripInput['input'], 'id'>,
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord | undefined> {
    return this.TripModel.updateOne(updateTripInput, andWhereArgs, orWhereArgs);
  }

  public getTripLegs(tripId: TripRecord['id']): Promise<TripLegRecord[]> {
    return this.TripLegModel.findMany({ trip_id: tripId });
  }
}
