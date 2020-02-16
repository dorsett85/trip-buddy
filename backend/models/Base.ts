import db from '../db/db';
import { extractRow, extractRows } from '../utils/dbHelpers';
import { RecordDict, WhereArgs, WhereArgsWithUserIdJoin } from '../types';
import { QB } from '../utils/QueryBuilder';

const qb = QB(db);

export default class BaseModel {
  public static tableName: string;

  protected static async baseCreateOne<T>(record: RecordDict): Promise<T> {
    const query = qb<T>(this.tableName).insert(record);
    return extractRow<T>(await query);
  }

  protected static async baseFindOne<T>(whereArgs: WhereArgs<Partial<T>>): Promise<T> {
    const [row]: T[] = await this.baseFindMany(whereArgs);
    return row;
  }

  protected static async baseFindMany<T>(whereArgs: WhereArgs<Partial<T>>): Promise<T[]> {
    const query = qb<T>(this.tableName)
      .select()
      .where(whereArgs);
    return extractRows<T>(await query);
  }

  protected static async baseFindManyByUserId<T>(
    whereArgs: WhereArgs<Partial<T>>,
    joinUserIdStatement: string
  ): Promise<T[]> {
    const query = qb<T>(this.tableName)
      .select()
      .joinRaw(joinUserIdStatement)
      .where(whereArgs);
    return extractRows<T>(await query);
  }

  protected static async baseUpdateOne<T>(
    updateArgs: RecordDict,
    whereArgs: WhereArgs<Partial<T>>
  ): Promise<T> {
    const query = qb<T>(this.tableName)
      .update(updateArgs)
      .where(whereArgs);
    return extractRow<T>(await query);
  }

  protected static async baseUpdateOneByUserId<T>(
    updateArgs: RecordDict,
    args: WhereArgsWithUserIdJoin<T>
  ): Promise<T | undefined> {
    const { userIdTable, userIdJoin, whereArgs } = args;

    const query = qb<T>(this.tableName)
      .update(updateArgs, userIdTable)
      .where(userIdJoin)
      .where(whereArgs);

    return extractRow<T>(await query);
  }

  protected static async baseDeleteOne<T>(id: number): Promise<T> {
    const query = qb<T>(this.tableName)
      .delete()
      .where({ items: { id } });
    return extractRow<T>(await query);
  }

  protected static async baseDeleteOneByUserId<T>(
    args: WhereArgsWithUserIdJoin<T>
  ): Promise<T> {
    const { userIdTable, userIdJoin, whereArgs } = args;

    const query = qb<T>(this.tableName)
      .delete(userIdTable)
      .where(userIdJoin)
      .where(whereArgs);

    return extractRow<T>(await query);
  }
}
