import TripModel from '../models/Trip';
import UserTripModel from '../models/UserTrip';
import { TripServiceDeps } from './Trip.types';
import { TripRecord } from 'common/lib/types/trip';
import { UserRecord } from 'common/lib/types/user';
// eslint-disable-next-line import/no-cycle
import {
  CreateTripInput,
  UpdateTripInput,
  UpdateTripItineraryInput,
  CreateTripItineraryInput
} from '../schema/resolvers/trip.types';
import TripItineraryModel from '../models/TripItinerary';
import { TripItineraryRecord } from 'common/src/types/tripItinerary';

export default class TripService {
  private TripModel: typeof TripModel;

  private TripItineraryModel: typeof TripItineraryModel;

  private UserTripModel: typeof UserTripModel;

  constructor(dependencies: TripServiceDeps = {}) {
    this.TripModel = dependencies.TripModel || TripModel;
    this.TripItineraryModel = dependencies.TripItineraryModel || TripItineraryModel;
    this.UserTripModel = dependencies.UserTripModel || UserTripModel;
  }

  public async createOne(
    createTripInput: CreateTripInput['input'],
    userId: UserRecord['id']
  ): Promise<TripRecord> {
    // Create the new trip and add a record to the users_trips pivot table
    const trip = await this.TripModel.createOne(createTripInput);
    await this.UserTripModel.createOne({ user_id: userId, trip_id: trip.id });

    return trip;
  }

  public findOne(
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord | undefined> {
    return this.TripModel.findOne(andWhereArgs, orWhereArgs);
  }

  public findMany(
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord[]> {
    return this.TripModel.findMany(andWhereArgs, orWhereArgs);
  }

  public findOneByUserId(
    userId: UserRecord['id'],
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord | undefined> {
    return this.TripModel.findOneByUserId(userId, andWhereArgs, orWhereArgs);
  }

  public findManyByUserId(
    userId: UserRecord['id'],
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord[]> {
    return this.TripModel.findManyByUserId(userId, andWhereArgs, orWhereArgs);
  }

  public updateOne(
    updateTripInput: UpdateTripInput['input'],
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord | undefined> {
    return this.TripModel.updateOne(updateTripInput, andWhereArgs, orWhereArgs);
  }

  public deleteOne(tripId: TripRecord['id']): Promise<TripRecord | undefined> {
    return this.TripModel.deleteOne(tripId);
  }

  public findTripItinerary(
    andWhereArgs: Partial<TripItineraryRecord> = {},
    orWhereArgs: Partial<TripItineraryRecord> = {}
  ): Promise<TripItineraryRecord[]> {
    return this.TripItineraryModel.findMany(andWhereArgs, orWhereArgs);
  }

  public createTripItinerary(
    createTripItineraryInput: CreateTripItineraryInput['input']
  ): Promise<TripItineraryRecord> {
    return this.TripItineraryModel.createOne(createTripItineraryInput);
  }

  public updateTripItinerary(
    updateTripItineraryInput: UpdateTripItineraryInput['input'],
    andWhereArgs: Partial<TripItineraryRecord> = {},
    orWhereArgs: Partial<TripItineraryRecord> = {}
  ): Promise<TripItineraryRecord | undefined> {
    return this.TripItineraryModel.updateOne(
      updateTripItineraryInput,
      andWhereArgs,
      orWhereArgs
    );
  }

  public deleteTripItinerary(id: TripItineraryRecord['id']): Promise<TripItineraryRecord | undefined> {
    return this.TripItineraryModel.deleteOne(id);
  }
}
