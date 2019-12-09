import { TripItineraryRecord } from './TripItinerary.types';
import BaseModel from './Base';
import { TripRecord } from './Trip.types';

export default class TripItineraryModel extends BaseModel {
  public static tableName = 'trip_itineraries';

  public static createOne(
    tripItinerary: Partial<TripItineraryRecord>
  ): Promise<TripItineraryRecord> {
    return this.baseCreateOne(tripItinerary);
  }

  public static findOne(
    andWhereArgs: Partial<TripItineraryRecord> = {},
    orWhereArgs: Partial<TripItineraryRecord> = {}
  ): Promise<TripItineraryRecord | undefined> {
    return this.baseFindOne(andWhereArgs, orWhereArgs);
  }

  public static findMany(
    andWhereArgs: Partial<TripItineraryRecord> = {},
    orWhereArgs: Partial<TripItineraryRecord> = {}
  ): Promise<TripItineraryRecord[]> {
    return this.baseFindMany(andWhereArgs, orWhereArgs);
  }

  public static async findByTripId(
    tripId: TripRecord['id']
  ): Promise<TripItineraryRecord[]> {
    return this.findMany({ trip_id: tripId });
  }
}
