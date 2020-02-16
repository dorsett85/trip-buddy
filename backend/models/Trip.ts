import { TripRecord } from 'common/lib/types/trip';
import { UserRecord } from 'common/lib/types/user';
import BaseModel from './Base';
import { WhereUserIdArgs, WhereJoinUserIdArgs, OmitId } from '../types';
import { WhereArgs } from '../utils/QueryBuilder';

export default class TripModel extends BaseModel {
  public static tableName = 'trips';

  public static createOne(trip: Partial<TripRecord>): Promise<TripRecord> {
    return this.baseCreateOne(trip);
  }

  public static findOne(
    whereArgs: WhereArgs<Partial<TripRecord>>
  ): Promise<TripRecord | undefined> {
    return this.baseFindOne(whereArgs);
  }

  public static findMany(
    whereArgs: WhereArgs<Partial<TripRecord>>
  ): Promise<TripRecord[]> {
    return this.baseFindMany(whereArgs);
  }

  public static async findOneByUserId(
    whereArgs: WhereArgs<Partial<TripRecord>>
  ): Promise<TripRecord | undefined> {
    return (await this.findManyByUserId(whereArgs))[0];
  }

  public static async findManyByUserId(
    whereArgs: WhereArgs<Partial<TripRecord>>
  ): Promise<TripRecord[]> {
    return this.baseFindManyByUserId(
      whereArgs,
      `LEFT JOIN users_trips ut ON ut.trip_id = ${this.tableName}.id`
    );
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
