import { TripRecord } from 'common/lib/types/trip';
import { UserRecord } from 'common/lib/types/user';
import BaseModel from './Base';
import { OmitId, WhereArgs, WithUserId } from '../types';

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
    whereArgs: WhereArgs<Partial<TripRecord>>
  ): Promise<TripRecord | undefined> {
    return this.baseUpdateOne(updateArgs, whereArgs);
  }

  public static updateOneByUserId(
    updateArgs: OmitId<Partial<TripRecord>>,
    whereArgs: WhereArgs<Partial<TripRecord>>
  ): Promise<TripRecord | undefined> {
    return this.baseUpdateOneByUserId(updateArgs, {
      userIdTable: 'users_trips ut',
      userIdJoin: `${this.tableName}.id = ut.trip_id`,
      whereArgs
    });
  }

  public static deleteOne(
    tripId: TripRecord['id'],
    userId?: UserRecord['id']
  ): Promise<TripRecord | undefined> {
    if (!userId) {
      return this.baseDeleteOne(tripId);
    }

    return this.baseDeleteOneByUserId<WithUserId<TripRecord>>({
      userIdTable: 'users_trips ut',
      userIdJoin: `${this.tableName}.id = ut.trip_id`,
      whereArgs: [
        { items: { id: tripId } },
        { items: { user_id: userId }, prefixTableName: false }
      ]
    });
  }
}
