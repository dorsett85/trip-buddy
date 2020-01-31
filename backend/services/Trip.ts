import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import { TripItineraryRecord } from 'common/src/types/tripItinerary';
import TripModel from '../models/Trip';
import UserTripModel from '../models/UserTrip';
import { TripServiceDeps } from './Trip.types';
// eslint-disable-next-line import/no-cycle
import {
  CreateTripInput,
  UpdateTripInput,
  UpdateTripItineraryInput,
  CreateTripItineraryInput
} from '../schema/resolvers/trip.types';
import TripItineraryModel from '../models/TripItinerary';
import { OmitId } from '../types';

export default class TripService {
  private user: UserRecord;

  private TripModel: typeof TripModel;

  private TripItineraryModel: typeof TripItineraryModel;

  private UserTripModel: typeof UserTripModel;

  constructor(dependencies: TripServiceDeps) {
    this.user = dependencies.user;
    this.TripModel = dependencies.TripModel;
    this.TripItineraryModel = dependencies.TripItineraryModel;
    this.UserTripModel = dependencies.UserTripModel;
  }

  public async createOne(createTripInput: CreateTripInput['input']): Promise<TripRecord> {
    // Create the new trip and add a record to the users_trips pivot table
    const trip = await this.TripModel.createOne(createTripInput);
    await this.UserTripModel.createOne({ user_id: this.user.id, trip_id: trip.id });

    return trip;
  }

  public findOne(
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord | undefined> {
    const { id, role } = this.user;
    return role === 'admin'
      ? this.TripModel.findOne(andWhereArgs, orWhereArgs)
      : this.TripModel.findOneByUserId(id, andWhereArgs, orWhereArgs);
  }

  public findMany(
    userId: UserRecord['id'],
    andWhereArgs?: Partial<TripRecord>,
    orWhereArgs?: Partial<TripRecord>
  ): Promise<TripRecord[]>;

  // eslint-disable-next-line no-dupe-class-members
  public findMany(
    andWhereArgs: Partial<TripRecord>,
    orWhereArgs?: Partial<TripRecord>
  ): Promise<TripRecord[]>;

  // eslint-disable-next-line no-dupe-class-members
  public findMany(
    arg1: Partial<TripRecord> | UserRecord['id'],
    arg2: Partial<TripRecord> = {},
    arg3: Partial<TripRecord> = {}
  ): Promise<TripRecord[]> {
    const { id, role } = this.user;

    if (typeof arg1 === 'number') {
      return this.TripModel.findManyByUserId(id, arg2, arg3);
    }

    return role === 'admin'
      ? this.TripModel.findMany(arg1, arg2)
      : this.TripModel.findManyByUserId(id, arg1, arg2);
  }

  public updateOne(
    updateTripInput: OmitId<UpdateTripInput['input']>,
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord | undefined> {
    const { id, role } = this.user;

    return role === 'admin'
      ? this.TripModel.updateOne(updateTripInput, andWhereArgs, orWhereArgs)
      : this.TripModel.updateOneByUserId(updateTripInput, {
          userId: id,
          andWhereArgs,
          orWhereArgs
        });
  }

  public deleteOne(tripId: TripRecord['id']): Promise<TripRecord | undefined> {
    const { id, role } = this.user;
    return role === 'admin'
      ? this.TripModel.deleteOne(tripId)
      : this.TripModel.deleteOne(tripId, id);
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
    updateTripItineraryInput: OmitId<UpdateTripItineraryInput['input']>,
    andWhereArgs: Partial<TripItineraryRecord> = {},
    orWhereArgs: Partial<TripItineraryRecord> = {}
  ): Promise<TripItineraryRecord | undefined> {
    return this.TripItineraryModel.updateOne(
      updateTripItineraryInput,
      andWhereArgs,
      orWhereArgs
    );
  }

  public deleteTripItinerary(
    id: TripItineraryRecord['id']
  ): Promise<TripItineraryRecord | undefined> {
    return this.TripItineraryModel.deleteOne(id);
  }
}
