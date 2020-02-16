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
import { QB } from '../utils/QueryBuilder';

const qb = QB(db);

export default class BaseModel {
  public static tableName: string;

  protected static async baseCreateOne<T>(record: KeyValue): Promise<T> {
    const query = qb(this.tableName).insert(record);
    return extractRow(await query);
  }

  protected static async baseFindOne<T>(
    andWhereArgs: KeyValue = {},
    orWhereArgs: KeyValue = {}
  ): Promise<T> {
    const [row]: T[] = await this.baseFindMany(andWhereArgs, orWhereArgs);
    return row;
  }

  protected static async baseFindMany<T>(
    andWhereArgs: KeyValue = {},
    orWhereArgs: KeyValue = {}
  ): Promise<T[]> {
    const select = addSelect(this.tableName);
    const where = addWhere(this.tableName, { andWhereArgs, orWhereArgs });
    const text = `${select.text} ${where.text};`;
    const { values } = where;

    return extractRows(await db.query({ text, values }));
  }

  protected static async baseFindManyByUserId<T>(
    args: WhereJoinUserIdArgs
  ): Promise<T[]> {
    const { joinStatement, ...restWhereArgs } = args;

    const select = addSelect(this.tableName);
    const where = addWhere(this.tableName, restWhereArgs);

    const text = `
      ${select.text}
        ${joinStatement}
      ${where.text}
    `;
    const { values } = where;

    return extractRows(await db.query({ text, values }));
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

    return extractRow(await db.query({ text, values }));
  }

  protected static async baseUpdateOneByUserId<T>(
    updateArgs: OmitIdCreatedDate<Partial<T>>,
    args: WhereJoinUserIdArgs
  ): Promise<T | undefined> {
    const { userId, joinStatement, andWhereArgs, orWhereArgs } = args;
    let paramVal = 1;

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

    return extractRow(await db.query({ text, values }));
  }

  protected static async baseDeleteOne<T>(id: number): Promise<T> {
    const query = qb(this.tableName)
      .delete()
      .where({ items: { id } });
    return extractRow(await query);
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

    return extractRow(await query);
  }
}
