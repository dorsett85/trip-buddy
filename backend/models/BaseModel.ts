import { extractRow, extractRows } from '../utils/dbHelpers';
import { WhereArgs } from '../types';
import { GenerateQueryBuilder } from '../utils/QueryBuilder';
import { IBaseModel } from './BaseModel.types';

export default class BaseModel implements IBaseModel {
  // eslint-disable-next-line no-empty-function
  constructor(public tableName: string, protected db: GenerateQueryBuilder) {}

  protected async baseCreateOne<T>(record: Partial<T>): Promise<T> {
    const query = this.db<T>(this.tableName).insert(record);
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
    const query = this.db<T>(this.tableName)
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
    const query = this.db<T>(this.tableName)
      .update(updateArgs, tableWithUserId)
      .where(whereArgs);
    return (await query).rowCount;
  }

  protected async baseDeleteOne<T>(
    whereArgs: WhereArgs<Partial<T>>,
    tableWithUserId?: string
  ): Promise<number> {
    const query = this.db<T>(this.tableName)
      .delete(tableWithUserId)
      .where(whereArgs);
    return (await query).rowCount;
  }
}
