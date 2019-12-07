import db from '../db/db';
import { TripRecord } from './Trip.types';
import { UserRecord } from './User.types';
import BaseModel from './Base';
import { addSelect, addWhere } from '../utils/dbHelpers';

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
    const where = addWhere({
      andWhereArgs: { ...andWhereArgs, user_id: userId },
      orWhereArgs
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
}
