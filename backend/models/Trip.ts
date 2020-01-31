import { TripRecord } from 'common/lib/types/trip';
import { UserRecord } from 'common/lib/types/user';
import db from '../db/db';
import BaseModel from './Base';
import { addSelect, addWhere } from '../utils/dbHelpers';
import { WhereUserIdArgs, WhereJoinUserIdArgs, OmitId } from '../types';

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
    const where = addWhere(this.tableName, { andWhereArgs, orWhereArgs });
    const text = `
      ${select.text}
        JOIN users_trips ut ON ut.trip_id = ${this.tableName}.id
      ${where.text} AND user_id = ${userId};
    `;
    const values = where.values!;

    const { rows }: { rows: TripRecord[] } = await db.query({ text, values });

    return rows;
  }

  public static updateOne(
    updateArgs: OmitId<Partial<TripRecord>>,
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord | undefined> {
    return this.baseUpdateOne(updateArgs, andWhereArgs, orWhereArgs);
  }

  public static updateOneByUserId(
    updateArgs: OmitId<Partial<TripRecord>>,
    args: WhereUserIdArgs<Partial<TripRecord>>
  ): Promise<TripRecord | undefined> {
    const whereJoinUserIdArgs: WhereJoinUserIdArgs<Partial<TripRecord>> = {
      ...args,
      joinStatement: `LEFT JOIN users_trips ut ON ut.trip_id = ${this.tableName}.id`
    };
    return this.baseUpdateOneByUserId(updateArgs, whereJoinUserIdArgs);
  }

  public static deleteOne(tripId: TripRecord['id']): Promise<TripRecord | undefined>;

  // eslint-disable-next-line no-dupe-class-members
  public static deleteOne(
    tripId: TripRecord['id'],
    userId: UserRecord['id']
  ): Promise<TripRecord | undefined>;

  // eslint-disable-next-line no-dupe-class-members
  public static deleteOne(
    tripId: TripRecord['id'],
    userId?: UserRecord['id']
  ): Promise<TripRecord | undefined> {
    if (!userId) {
      return this.baseDeleteOne(tripId);
    }

    return this.baseDeleteOneByUserId(tripId, {
      userId,
      joinStatement: `LEFT JOIN users_trips ut ON ut.trip_id = ${this.tableName}.id`
    });
  }
}
