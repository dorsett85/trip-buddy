import db from '../db/db';
import { extractRow, extractRows } from '../utils/dbHelpers';
import { WhereArgs } from '../types';
import { QB } from '../utils/QueryBuilder';
import { IBaseModel } from './BaseModel.types';

const qb = QB(db);

export default class BaseModel implements IBaseModel {
  public readonly tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected async baseCreateOne<T>(record: Partial<T>): Promise<T> {
    const query = qb<T>(this.tableName).insert(record);
    return extractRow<T>(await query);
  }

  protected async baseFindOne<T>(
    whereArgs: WhereArgs<Partial<T>>,
    joinUserIdTable?: string
  ): Promise<T | undefined> {
    return (await this.baseFindMany(whereArgs, joinUserIdTable))[0];
  }

  protected async baseFindMany<T>(
    whereArgs?: WhereArgs<Partial<T>>,
    joinUserIdTable?: string
  ): Promise<T[]> {
    const query = qb<T>(this.tableName)
      .select()
      .joinRaw(joinUserIdTable)
      .where(whereArgs);
    return extractRows<T>(await query);
  }

  protected async baseUpdateOne<T>(
    updateArgs: Partial<T>,
    whereArgs: WhereArgs<Partial<T>>,
    tableWithUserId?: string
  ): Promise<number> {
    const query = qb<T>(this.tableName)
      .update(updateArgs, tableWithUserId)
      .where(whereArgs);
    return (await query).rowCount;
  }

  protected async baseDeleteOne<T>(
    whereArgs: WhereArgs<Partial<T>>,
    tableWithUserId?: string
  ): Promise<number> {
    const query = qb<T>(this.tableName)
      .delete(tableWithUserId)
      .where(whereArgs);
    return (await query).rowCount;
  }
}
