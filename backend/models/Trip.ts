import db from '../db/db';
import { TripRecord } from 'common/lib/types/trip';
import { UserRecord } from 'common/lib/types/user';
import BaseModel from './Base';
import { addSelect, addWhere, prefixTableName } from '../utils/dbHelpers';

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

  public static async findOneByUserId(
    userId: UserRecord['id'],
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord | undefined> {
    return (await this.findManyByUserId(userId, andWhereArgs, orWhereArgs))[0];
  }

  public static async findManyByUserId(
    userId: UserRecord['id'],
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord[]> {
    const select = addSelect(this.tableName);

    // Make sure to prefix the whereArgs with the table name so "id" is not ambiguous
    // in the query
    const where = addWhere({
      andWhereArgs: { ...prefixTableName(this.tableName, andWhereArgs), user_id: userId },
      orWhereArgs: prefixTableName(this.tableName, orWhereArgs)
    });
    const text = `
      ${select.text}
        JOIN users_trips ut ON ut.trip_id = ${this.tableName}.id
        JOIN users u ON u.id = ut.user_id
      ${where.text};
    `;
    const values = where.values!;

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

  public static deleteOne(tripId: TripRecord['id']): Promise<TripRecord | undefined> {
    return this.baseDeleteOne(tripId);
  }
}
