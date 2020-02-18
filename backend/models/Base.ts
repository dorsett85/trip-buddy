import db from '../db/db';
import { extractRow, extractRows } from '../utils/dbHelpers';
import { RecordDict, WhereArgs, WhereArgsWithUserIdJoin } from '../types';
import { QB } from '../utils/QueryBuilder';

const qb = QB(db);

export default class BaseModel {
  public static readonly tableName: string;

  public static readonly tableWithUserId: string;

  public static readonly joinTableWithUserId: string;

  public static readonly whereTableWithUserId: string;

  protected static async baseCreateOne<T>(record: RecordDict): Promise<T> {
    const query = qb<T>(this.tableName).insert(record);
    return extractRow<T>(await query);
  }

  protected static async baseFindOne<T>(
    whereArgs: WhereArgs<Partial<T>>,
    joinUserIdTable?: string
  ): Promise<T> {
    const [row]: T[] = await this.baseFindMany(whereArgs, joinUserIdTable);
    return row;
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
    updateArgs: RecordDict,
    whereArgs: WhereArgs<Partial<T>>,
    tableWithUserId?: string
  ): Promise<T | undefined> {
    const query = qb<T>(this.tableName)
      .update(updateArgs, tableWithUserId)
      .where(whereArgs);
    return extractRow<T>(await query);
  }

  protected static async baseDeleteOne<T>(
    whereArgs: WhereArgs<Partial<T>>,
    tableWithUserId?: string
  ): Promise<T> {
    const query = qb<T>(this.tableName)
      .delete(tableWithUserId)
      .where(whereArgs);
    return extractRow<T>(await query);
  }
}
