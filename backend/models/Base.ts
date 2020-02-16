import db from '../db/db';
import {
  addWhere,
  addSelect,
  addUpdate,
  extractRow,
  extractRows
} from '../utils/dbHelpers';
import {
  KeyValue,
  WhereJoinUserIdArgs,
  OmitIdCreatedDate,
  JoinUserIdArgs
} from '../types';
import { QB, WhereArgs } from '../utils/QueryBuilder';

const qb = QB(db);

export default class BaseModel {
  public static tableName: string;

  protected static async baseCreateOne<T>(record: KeyValue): Promise<T> {
    const query = qb(this.tableName).insert(record);
    return extractRow<T>(await query);
  }

  protected static async baseFindOne<T>(
    whereArgs: WhereArgs<Partial<T>>
  ): Promise<T> {
    const [row]: T[] = await this.baseFindMany(whereArgs);
    return row;
  }

  protected static async baseFindMany<T>(
    whereArgs: WhereArgs<Partial<T>>
  ): Promise<T[]> {
    const query = qb(this.tableName).select().where(whereArgs);
    return extractRows<T>(await query);
  }

  protected static async baseFindManyByUserId<T>(
    whereArgs: WhereArgs<Partial<T>>,
    joinStatement: string
  ): Promise<T[]> {
    const query = qb(this.tableName)
      .select()
      .joinRaw(joinStatement)
      .where(whereArgs);
    return extractRows<T>(await query);
  }

  protected static async baseUpdateOne<T>(
    updateArgs: KeyValue = {},
    andWhereArgs: KeyValue = {},
    orWhereArgs: KeyValue = {}
  ): Promise<T> {
    let paramVal = 1;

    // Select statement is needed in the where clause subquery that returns only 1 id
    const select = addSelect(this.tableName, ['id']);

    const update = addUpdate(this.tableName, updateArgs, paramVal);
    paramVal += update.values!.length;
    const where = addWhere(this.tableName, { andWhereArgs, orWhereArgs }, paramVal);

    const text = `
      ${update.text}
      WHERE id = (
        ${select.text}
        ${where.text}
        ORDER BY id LIMIT 1
      )
      RETURNING *;
    `;
    const values = [update.values!, where.values!].flat();

    return extractRow<T>(await db.query({ text, values }));
  }

  protected static async baseUpdateOneByUserId<T>(
    updateArgs: OmitIdCreatedDate<Partial<T>>,
    args: WhereJoinUserIdArgs
  ): Promise<T | undefined> {
    const { userId, joinStatement, andWhereArgs, orWhereArgs } = args;
    let paramVal = 1;
    console.log('update args', updateArgs);
    console.log('where args', args)

    // Select statement with id column is needed in the where clause
    // subquery (e.g., WHERE id = ...) so that only it only matches 1 id
    const select = addSelect(this.tableName, ['id']);

    const update = addUpdate(this.tableName, updateArgs, paramVal);
    paramVal += update.values!.length;

    const where = addWhere(
      this.tableName,
      {
        andWhereArgs,
        orWhereArgs
      },
      paramVal
    );

    const text = `
      ${update.text}
      WHERE id = (
        ${select.text}
          ${joinStatement}
        ${where.text} AND user_id = ${userId}
      )
      RETURNING *;
    `;
    const values = [update.values!, where.values!].flat();

    return extractRow<T>(await db.query({ text, values }));
  }

  protected static async baseDeleteOne<T>(id: number): Promise<T> {
    const query = qb(this.tableName)
      .delete()
      .where({ items: { id } });
    return extractRow<T>(await query);
  }

  protected static async baseDeleteOneByUserId<T>(
    id: number,
    joinUserIdArgs: JoinUserIdArgs
  ): Promise<T> {
    const { userId, joinStatement } = joinUserIdArgs;

    const query = qb(this.tableName)
      .delete()
      .where(
        `
        id = (
          SELECT ${this.tableName}.id
          FROM ${this.tableName}
            ${joinStatement}
          WHERE ${this.tableName}.id = ? AND user_id = ?
        )
       `,
        [id, userId]
      );

    return extractRow<T>(await query);
  }
}
