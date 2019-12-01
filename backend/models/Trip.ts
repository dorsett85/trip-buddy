import db from '../db/db';
import { TripRecord } from './Trip.types';
import { UserRecord } from './User.types';
import BaseModel from './Base';

export default class TripModel extends BaseModel {
  public static tableName = 'trips';

  public static createOne(trip: Partial<TripRecord>): Promise<TripRecord> {
    return this.baseCreateOne(trip);
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

  public static updateOne(
    updateArgs: Partial<TripRecord>,
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord | undefined> {
    return this.baseUpdateOne(updateArgs, andWhereArgs, orWhereArgs);
  }
}
