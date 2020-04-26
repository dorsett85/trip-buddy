import { PartialTripRecord, TripRecord } from 'common/lib/types/trip';
import { UserRecord } from 'common/lib/types/user';
import { UserTripRecord } from 'common/lib/types/userTrip';
import { OmitIdCreatedDate } from 'common/lib/types/utils';
import BaseModel from './BaseModel';
import { WhereArgGroup, WhereArgs } from '../types/dbQueryUtils';
import { CreateTripInput } from '../schema/types/graphql';

export default class TripModel extends BaseModel {
  private tableWithUserId = 'users_trips ut';

  private joinTableWithUserId = `LEFT JOIN ${this.tableWithUserId} ON ut.trip_id = ${this.tableName}.id`;

  private whereTableWithUserId = `${this.tableName}.id = ut.trip_id`;

  public createOne(trip: CreateTripInput): Promise<TripRecord> {
    return this.baseCreateOne<TripRecord>(trip);
  }

  public findOne(
    whereArgs: WhereArgs<PartialTripRecord>,
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
    whereArgs?: WhereArgs<PartialTripRecord>,
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
    updateArgs: OmitIdCreatedDate<PartialTripRecord>,
    whereArgs: WhereArgs<PartialTripRecord>,
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
      ? [...userIdWhereGroup, ...whereArgs]
      : [...userIdWhereGroup, whereArgs];
    return this.baseUpdateOne(updateArgs, whereArgsWithUserId, this.tableWithUserId);
  }

  public deleteOne(tripId: TripRecord['id'], userId?: UserRecord['id']): Promise<number> {
    const whereArgs: WhereArgs<PartialTripRecord> = { items: { id: tripId } };
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
