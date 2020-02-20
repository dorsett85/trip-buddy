import { TripItineraryRecord } from 'common/lib/types/tripItinerary';
import { UserRecord } from 'common/lib/types/user';
import { UserTripRecord } from 'common/lib/types/userTrip';
import BaseModel from './Base';
import { OmitId, WhereArgGroup, WhereArgs } from '../types';

export default class TripItineraryModel extends BaseModel {
  public static readonly tableName = 'trip_itineraries';

  public static readonly tableWithUserId = 'users_trips ut';

  public static readonly joinTableWithUserId = `LEFT JOIN ${TripItineraryModel.tableWithUserId} ON ut.trip_id = ${TripItineraryModel.tableName}.trip_id`;

  public static readonly whereTableWithUserId = `${TripItineraryModel.tableName}.trip_id = ut.trip_id`;

  public static createOne(
    tripItinerary: Partial<TripItineraryRecord>
  ): Promise<TripItineraryRecord> {
    return this.baseCreateOne(tripItinerary);
  }

  public static findMany(
    whereArgs: WhereArgs<Partial<TripItineraryRecord>>,
    userId?: UserRecord['id']
  ): Promise<TripItineraryRecord[]> {
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
    updateArgs: OmitId<Partial<TripItineraryRecord>>,
    whereArgs: WhereArgs<Partial<TripItineraryRecord>>,
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

  public static deleteOne(
    itineraryId: TripItineraryRecord['id'],
    userId?: UserRecord['id']
  ): Promise<number> {
    const whereArgs: WhereArgs<Partial<TripItineraryRecord>> = {
      items: { id: itineraryId }
    };
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
