import db from '../db/db';
import {extractRow, extractRows} from '../utils/dbHelpers';
import { WhereArgs } from '../types';
import { QB } from '../utils/QueryBuilder';

const qb = QB(db);

export default class BaseModel {
  public static readonly tableName: string;

  public static readonly tableWithUserId: string;

  public static readonly joinTableWithUserId: string;

  public static readonly whereTableWithUserId: string;

  protected static async baseCreateOne<T>(record: Partial<T>): Promise<T> {
    const query = qb<T>(this.tableName).insert(record);
    return extractRow<T>(await query);
  }

  protected static async baseFindOne<T>(
    whereArgs: WhereArgs<Partial<T>>,
    joinUserIdTable?: string
  ): Promise<T | undefined> {
    return (await this.baseFindMany(whereArgs, joinUserIdTable))[0];
  }

  protected static async baseFindMany<T>(
    whereArgs?: WhereArgs<Partial<T>>,
    joinUserIdTable?: string
  ): Promise<T[]> {
    const query = qb<T>(this.tableName)
      .select()
      .joinRaw(joinUserIdTable)
      .where(whereArgs);
    return extractRows<T>(await query);
  }

  protected static async baseUpdateOne<T>(
    updateArgs: Partial<T>,
    whereArgs: WhereArgs<Partial<T>>,
    tableWithUserId?: string
  ): Promise<number> {
    const query = qb<T>(this.tableName)
      .update(updateArgs, tableWithUserId)
      .where(whereArgs);
    return (await query).rowCount;
  }

  protected static async baseDeleteOne<T>(
    whereArgs: WhereArgs<Partial<T>>,
    tableWithUserId?: string
  ): Promise<number> {
    const query = qb<T>(this.tableName)
      .delete(tableWithUserId)
      .where(whereArgs);
    return (await query).rowCount;
  }
}
