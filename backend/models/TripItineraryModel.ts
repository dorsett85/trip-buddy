import { OmitId } from 'common/lib/types/utils';
import BaseModel from './BaseModel';
import { WhereArgGroup, WhereArgs } from '../types/dbQueryUtils';
import {
  CreateTripItineraryInput,
  UpdateTripItineraryInput
} from '../schema/types/graphql';
import {
  PartialTripItineraryRecord,
  TripItineraryRecord
} from './TripItineraryModel.types';
import { UserRecord } from './UserModel.types';
import { PartialUserTripRecord } from './UserTripModel.types';

export default class TripItineraryModel extends BaseModel {
  private readonly tableWithUserId = 'users_trips ut';

  private readonly joinTableWithUserId = `LEFT JOIN ${this.tableWithUserId} ON ut.trip_id = ${this.tableName}.trip_id`;

  private readonly whereTableWithUserId = `${this.tableName}.trip_id = ut.trip_id`;

  public createOne(
    tripItinerary: CreateTripItineraryInput
  ): Promise<TripItineraryRecord> {
    return this.baseCreateOne<TripItineraryRecord>(tripItinerary);
  }

  public findMany(
    whereArgs: WhereArgs<PartialTripItineraryRecord>,
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

  public updateOne(
    updateArgs: OmitId<UpdateTripItineraryInput>,
    whereArgs: WhereArgs<PartialTripItineraryRecord>,
    userId?: UserRecord['id']
  ): Promise<number> {
    if (!userId) {
      return this.baseUpdateOne(updateArgs, whereArgs);
    }

    const userIdWhereGroup: WhereArgs<PartialUserTripRecord> = [
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

  public deleteOne(
    itineraryId: TripItineraryRecord['id'],
    userId?: UserRecord['id']
  ): Promise<number> {
    const whereArgs: WhereArgs<PartialTripItineraryRecord> = {
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
