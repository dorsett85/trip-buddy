import { TripLegRecord } from './TripLeg.types';
import BaseModel from './Base';
import { TripLegItineraryRecord } from './TripLegItinerary.types';

export default class TripLegItineraryModel extends BaseModel {
  public static tableName = 'trip_legs';

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

  public static async findByTripLegId(tripLegId: TripLegRecord['id']): Promise<TripLegItineraryRecord[]> {
    const { rows }: { rows: TripLegItineraryRecord[] } = await this.findMany({ trip_leg_id: tripLegId });
    return rows;
  }
}
