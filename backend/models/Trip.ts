import { TripRecord } from 'common/lib/types/trip';
import { UserRecord } from 'common/lib/types/user';
import { UserTripRecord } from 'common/lib/types/userTrip';
import BaseModel from './Base';
import { OmitId, WhereArgGroup, WhereArgs } from '../types';

export default class TripModel extends BaseModel {
  public static tableName = 'trips';

  public static tableWithUserId = 'users_trips ut';

  public static joinTableWithUserId = `LEFT JOIN ${TripModel.tableWithUserId} ON ut.trip_id = ${TripModel.tableName}.id`;

  public static whereTableWithUserId = `${TripModel.tableName}.id = ut.trip_id`;

  public static createOne(trip: Partial<TripRecord>): Promise<TripRecord> {
    return this.baseCreateOne(trip);
  }

  public static findOne(
    whereArgs: WhereArgs<Partial<TripRecord>>,
    userId?: UserRecord['id']
  ): Promise<TripRecord | undefined> {
    if (!userId) {
      return this.baseFindOne(whereArgs);
    }
    const userIdWhereGroup: WhereArgGroup = {
      items: { user_id: userId },
      prefixTableName: false
    };
    const whereArgsWithUserId: WhereArgs = Array.isArray(whereArgs)
      ? [...whereArgs, userIdWhereGroup]
      : [whereArgs, userIdWhereGroup];
    return this.baseFindOne(whereArgsWithUserId, this.joinTableWithUserId);
  }

  public static findMany(
    whereArgs?: WhereArgs<Partial<TripRecord>>,
    userId?: UserRecord['id']
  ): Promise<TripRecord[]> {
    if (!userId) {
      return this.baseFindMany(whereArgs);
    }

    const userIdWhereGroup: WhereArgGroup = {
      items: { user_id: userId },
      prefixTableName: false
    };
    const whereArgsWithUserId: WhereArgs = !whereArgs
      ? userIdWhereGroup
      : Array.isArray(whereArgs)
      ? [...whereArgs, userIdWhereGroup]
      : [whereArgs, userIdWhereGroup];
    return this.baseFindMany(whereArgsWithUserId, this.joinTableWithUserId);
  }

  public static updateOne(
    updateArgs: OmitId<Partial<TripRecord>>,
    whereArgs: WhereArgs<Partial<TripRecord>>,
    userId?: UserRecord['id']
  ): Promise<TripRecord | undefined> {
    if (!userId) {
      return this.baseUpdateOne(updateArgs, whereArgs);
    }

    const userIdWhereGroup: WhereArgs<Partial<UserTripRecord>> = [
      { text: this.whereTableWithUserId },
      {
        items: { user_id: userId },
        prefixTableName: false
      }
    ];
    const whereArgsWithUserId: WhereArgs = Array.isArray(whereArgs)
      ? [...userIdWhereGroup, ...userIdWhereGroup]
      : [...userIdWhereGroup, whereArgs];
    return this.baseUpdateOne(updateArgs, whereArgsWithUserId, this.tableWithUserId);
  }

  public static deleteOne(
    tripId: TripRecord['id'],
    userId?: UserRecord['id']
  ): Promise<TripRecord | undefined> {
    const whereArgs: WhereArgs<Partial<TripRecord>> = { items: { id: tripId } };
    if (!userId) {
      return this.baseDeleteOne(whereArgs);
    }

    const userIdWhereArgs: WhereArgs = {
      items: { user_id: userId },
      prefixTableName: false
    };

    return this.baseDeleteOne([userIdWhereArgs, whereArgs], this.tableWithUserId);
  }
}
