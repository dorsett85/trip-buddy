import { TripRecord } from 'common/lib/types/trip';
import { UserRecord } from 'common/lib/types/user';
import { UserTripRecord } from 'common/lib/types/userTrip';
import BaseModel from './BaseModel';
import { OmitId } from '../types';
import { ITripModel } from './TripModel.types';
import { CreateTripInput, UpdateTripInput } from '../schema/resolvers/trip.types';
import { WhereArgGroup, WhereArgs } from '../types/dbQueryUtils';

export default class TripModel extends BaseModel implements ITripModel {
  private tableWithUserId = 'users_trips ut';

  private joinTableWithUserId = `LEFT JOIN ${this.tableWithUserId} ON ut.trip_id = ${this.tableName}.id`;

  private whereTableWithUserId = `${this.tableName}.id = ut.trip_id`;

  public createOne(trip: CreateTripInput['input']): Promise<TripRecord> {
    return this.baseCreateOne<TripRecord>(trip);
  }

  public findOne(
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

  public findMany(
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

  public updateOne(
    updateArgs: OmitId<UpdateTripInput['input']>,
    whereArgs: WhereArgs<Partial<TripRecord>>,
    userId?: UserRecord['id']
  ): Promise<number> {
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

  public deleteOne(tripId: TripRecord['id'], userId?: UserRecord['id']): Promise<number> {
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
