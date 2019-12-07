import BaseModel from './Base';
import { TripLegItineraryRecord } from './TripLegItinerary.types';

export default class TripLegItineraryModel extends BaseModel {
  public static tableName = 'trip_legs_itinerary';

  public static createOne(
    tripLegItinerary: Partial<TripLegItineraryRecord>
  ): Promise<TripLegItineraryRecord> {
    return this.baseCreateOne(tripLegItinerary);
  }

  public static findOne(
    andWhereArgs: Partial<TripLegItineraryRecord> = {},
    orWhereArgs: Partial<TripLegItineraryRecord> = {}
  ): Promise<TripLegItineraryRecord | undefined> {
    return this.baseFindOne(andWhereArgs, orWhereArgs);
  }

  public static findMany(
    andWhereArgs: Partial<TripLegItineraryRecord> = {},
    orWhereArgs: Partial<TripLegItineraryRecord> = {}
  ): Promise<TripLegItineraryRecord[]> {
    return this.baseFindMany(andWhereArgs, orWhereArgs);
  }
}
