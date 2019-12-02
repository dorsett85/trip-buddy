import TripModel from '../models/Trip';
import UserTripModel from '../models/UserTrip';
import { TripServiceDeps } from './Trip.types';
import { TripRecord } from '../models/Trip.types';
import { UserRecord } from '../models/User.types';
// eslint-disable-next-line import/no-cycle
import { CreateTripInput, TripInput, TripSchema } from '../schema/resolvers/trip.types';
import TripLegModel from '../models/TripLeg';
import { TripLegRecord } from '../models/TripLeg.types';
import TripLegItineraryModel from '../models/TripLegItinerary';
import { TripLegItineraryRecord } from '../models/TripLegItinerary.types';

export default class TripService {
  private TripModel: typeof TripModel;

  private TripLegModel: typeof TripLegModel;

  private TripLegItineraryModel: typeof TripLegItineraryModel;

  private UserTripModel: typeof UserTripModel;

  constructor(dependencies: TripServiceDeps = {}) {
    this.TripModel = dependencies.TripModel || TripModel;
    this.TripLegModel = dependencies.TripLegModel || TripLegModel;
    this.TripLegItineraryModel =
      dependencies.TripLegItineraryModel || TripLegItineraryModel;
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
    await this.TripLegModel.createOne({
      trip_id: trip.id,
      name: 'Leg 1',
      location: createTripInput.location,
      date_time: createTripInput.date_time
    });

    return trip;
  }

  public findOne(
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord | undefined> {
    return this.TripModel.findOne(andWhereArgs, orWhereArgs);
  }

  public updateOne(
    updateTripInput: TripInput['input'],
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord | undefined> {
    return this.TripModel.updateOne(updateTripInput, andWhereArgs, orWhereArgs);
  }

  public findTripLegs(
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripLegRecord[]> {
    return this.TripLegModel.findMany(andWhereArgs, orWhereArgs);
  }

  public findTripLegItinerary(
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripLegItineraryRecord[]> {
    return this.TripLegItineraryModel.findMany(andWhereArgs, orWhereArgs);
  }
}
