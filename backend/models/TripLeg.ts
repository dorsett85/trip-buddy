import { TripLegRecord } from './TripLeg.types';
import BaseModel from './Base';
import { TripRecord } from './Trip.types';
import { LngLatArray, LngLatObj } from '../types';

export default class TripLegModel extends BaseModel {
  public static tableName = 'trip_legs';

  /**
   * Convert TripRecord location to a point
   *
   * Our location array needs to be converted to a "point" string to be inserted into
   * Postgres' point type
   */
  public static convertLocationToPoint(
    location: TripLegRecord['location'] | undefined
  ): string | undefined {
    return location && `(${location.join(',')})`;
  }

  /**
   * Convert TripRecord location to an array
   *
   * Node-postgres returns point types as objects, but our app handles them as tuples, so
   * we need to convert the location object to an array
   */
  public static convertLocationToArray(location: LngLatObj): LngLatArray {
    const { x, y } = location;
    const convertedLocation: LngLatArray = [x, y];
    return convertedLocation;
  }

  public static async createOne(tripLeg: Partial<TripLegRecord>): Promise<TripLegRecord> {
    const { location } = tripLeg;
    const newTripLeg = {
      ...tripLeg,
      location: this.convertLocationToPoint(location)
    };

    const insertedTripLeg = await this.baseCreateOne(newTripLeg);
    insertedTripLeg.location = location;

    return insertedTripLeg;
  }

  public static async findOne(
    andWhereArgs: Partial<TripLegRecord> = {},
    orWhereArgs: Partial<TripLegRecord> = {}
  ): Promise<TripLegRecord | undefined> {
    const row = await this.baseFindOne(andWhereArgs, orWhereArgs);
    this.baseFindMany(andWhereArgs, orWhereArgs);

    if (row) {
      this.convertLocationToArray(row);
    }

    return row;
  }

  public static async findMany(
    andWhereArgs: Partial<TripLegRecord> = {},
    orWhereArgs: Partial<TripLegRecord> = {}
  ): Promise<TripLegRecord[]> {
    const rows = await this.baseFindMany(andWhereArgs, orWhereArgs);

    const transformedRows: TripLegRecord[] = rows.map(row => {
      row.location = this.convertLocationToArray(row.location);
      return row;
    });

    return transformedRows;
  }

  public static async findByTripId(tripId: TripRecord['id']): Promise<TripLegRecord[]> {
    return this.findMany({ trip_id: tripId });
  }
}
