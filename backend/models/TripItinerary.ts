import { TripItineraryRecord } from 'common/lib/types/tripItinerary';
import { TripRecord } from 'common/lib/types/trip';
import BaseModel from './Base';
import { WhereArgs } from '../types';

export default class TripItineraryModel extends BaseModel {
  public static tableName = 'trip_itineraries';

  public static createOne(
    tripItinerary: Partial<TripItineraryRecord>
  ): Promise<TripItineraryRecord> {
    return this.baseCreateOne(tripItinerary);
  }

  public static findOne(
    whereArgs: WhereArgs<Partial<TripItineraryRecord>>
  ): Promise<TripItineraryRecord | undefined> {
    return this.baseFindOne(whereArgs);
  }

  public static findMany(
    whereArgs: WhereArgs<Partial<TripItineraryRecord>>
  ): Promise<TripItineraryRecord[]> {
    return this.baseFindMany(whereArgs);
  }

  public static async findByTripId(
    tripId: TripRecord['id']
  ): Promise<TripItineraryRecord[]> {
    return this.findMany({ items: { trip_id: tripId } });
  }

  public static updateOne(
    updateArgs: Partial<TripItineraryRecord>,
    whereArgs: WhereArgs<Partial<TripItineraryRecord>>
  ): Promise<TripItineraryRecord | undefined> {
    return this.baseUpdateOne(updateArgs, whereArgs);
  }

  public static deleteOne(
    id: TripRecord['id']
  ): Promise<TripItineraryRecord | undefined> {
    return this.baseDeleteOne(id);
  }
}
