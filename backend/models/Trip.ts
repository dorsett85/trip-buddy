import db from '../db/db';
import { TripRecord } from './Trip.types';
import { UserRecord } from './User.types';
import BaseModel from './Base';

export default class TripModel extends BaseModel {
  public static tableName = 'trips';

  public static async createOne(trip: Partial<TripRecord>): Promise<TripRecord> {
    // We'll need to modify the lngLat so that postgres can insert into the 'point' type
    const newTrip = {
      ...trip,
      start_location: `(${trip.start_location!.join(',')})`
    };

    const insertedTrip = await this.baseCreateOne(newTrip);

    // Also need to modify the return point type back to an array
    const { x, y } = insertedTrip.start_location;
    insertedTrip.start_location = [x, y];

    return insertedTrip;
  }

  public static findOne(
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord | undefined> {
    return this.baseFindOne(andWhereArgs, orWhereArgs);
  }

  public static findMany(
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord[]> {
    return this.baseFindMany(andWhereArgs, orWhereArgs);
  }

  public static async findByUserId(userId: UserRecord['id']): Promise<TripRecord[]> {
    const text = `
      SELECT t.*
      FROM trips t
        JOIN users_trips ut ON ut.trip_id = t.id
        JOIN users u ON u.id = ut.user_id
      WHERE u.id = $1;
    `;
    const values = [userId];

    const { rows }: { rows: TripRecord[] } = await db.query({ text, values });
    return rows;
  }
}
