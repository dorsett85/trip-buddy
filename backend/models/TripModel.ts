import { OmitIdCreatedDate, RequireId } from 'common/lib/types/utils';
import BaseModel from './BaseModel';
import { WhereArgGroup, WhereArgs } from '../types/dbQueryUtils';
import { CreateTripInput } from '../schema/types/graphql';
import { PartialTripRecord, TripRecord } from './TripModel.types';
import { UserRecord } from './UserModel.types';
import { UserTripRecord } from './UserTripModel.types';

export default class TripModel extends BaseModel {
  private tableWithUserId = 'users_trips ut';

  private joinTableWithUserId = `LEFT JOIN ${this.tableWithUserId} ON ut.trip_id = ${this.tableName}.id`;

  private whereTableWithUserId = `${this.tableName}.id = ut.trip_id`;

  public createOne(trip: CreateTripInput): Promise<TripRecord> {
    return this.baseCreateOne<TripRecord>(trip);
  }

  public findOne(
    findArgs: PartialTripRecord,
    userId?: UserRecord['id']
  ): Promise<TripRecord | undefined> {
    const whereArgs: WhereArgGroup<PartialTripRecord> = { items: findArgs };

    // No user id means we can query for trips without joining a table with a
    // user id.
    if (!userId) {
      return this.baseFindOne<TripRecord>(whereArgs);
    }

    // If a user id exists we need to create a WhereArgs array containing
    // WhereArgGroup objects (one for the users_trips table and one for the
    // trips table).
    const userIdWhereGroup: WhereArgGroup<Pick<UserTripRecord, 'user_id'>> = {
      items: { user_id: userId },
      prefixTableName: false
    };
    const whereArgsWithUserId: WhereArgGroup[] = [whereArgs, userIdWhereGroup];

    return this.baseFindOne(whereArgsWithUserId, this.joinTableWithUserId);
  }

  public findMany(
    findArgs?: PartialTripRecord,
    userId?: UserRecord['id']
  ): Promise<TripRecord[]> {
    const whereArgs: WhereArgGroup<PartialTripRecord> | undefined = findArgs && {
      items: findArgs
    };

    if (!userId) {
      return this.baseFindMany(whereArgs);
    }

    const userIdWhereGroup: WhereArgGroup<Pick<UserTripRecord, 'user_id'>> = {
      items: { user_id: userId },
      prefixTableName: false
    };
    const whereArgsWithUserId: WhereArgs = !whereArgs
      ? userIdWhereGroup
      : [whereArgs, userIdWhereGroup];

    return this.baseFindMany(whereArgsWithUserId, this.joinTableWithUserId);
  }

  public updateOne(
    updateArgs: OmitIdCreatedDate<PartialTripRecord>,
    updateWhere: RequireId<PartialTripRecord>,
    userId?: UserRecord['id']
  ): Promise<number> {
    const whereArgs: WhereArgGroup<RequireId<PartialTripRecord>> = { items: updateWhere };

    if (!userId) {
      return this.baseUpdateOne(updateArgs, whereArgs);
    }

    const userIdWhereGroup: WhereArgs<Pick<UserTripRecord, 'user_id'>> = [
      { text: this.whereTableWithUserId },
      {
        items: { user_id: userId },
        prefixTableName: false
      }
    ];
    const whereArgsWithUserId: WhereArgs = [...userIdWhereGroup, whereArgs];

    return this.baseUpdateOne(updateArgs, whereArgsWithUserId, this.tableWithUserId);
  }

  public deleteOne(tripId: TripRecord['id'], userId?: UserRecord['id']): Promise<number> {
    const whereArgs: WhereArgGroup<Pick<TripRecord, 'id'>> = { items: { id: tripId } };
    if (!userId) {
      return this.baseDeleteOne(whereArgs);
    }

    const userIdWhereArgs: WhereArgGroup = {
      items: { user_id: userId },
      prefixTableName: false
    };

    return this.baseDeleteOne([userIdWhereArgs, whereArgs], this.tableWithUserId);
  }
}
