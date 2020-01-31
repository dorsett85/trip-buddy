import db from '../db/db';
import {
  addInsert,
  addWhere,
  addSelect,
  addUpdate,
  prefixTableName
} from '../utils/dbHelpers';
import {
  KeyValue,
  WhereJoinUserIdArgs,
  OmitIdCreatedDate,
  JoinUserIdArgs
} from '../types';

export default class BaseModel {
  public static tableName: string;

  protected static async baseCreateOne<T>(record: KeyValue): Promise<T> {
    const query = addInsert(this.tableName, record);
    const {
      rows: [row]
    }: { rows: T[] } = await db.query(query);

    return row;
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
    const where = addWhere({ andWhereArgs, orWhereArgs });
    const text = `${select.text} ${where.text};`;
    const { values } = where;

    const { rows }: { rows: T[] } = await db.query({ text, values });
    return rows;
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
    const where = addWhere({ andWhereArgs, orWhereArgs }, paramVal);

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

    const {
      rows: [row]
    }: { rows: T[] } = await db.query({ text, values });
    return row;
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

    // Make sure to prefix the whereArgs with the table name so "id" is not ambiguous
    // between the different tables
    const where = addWhere(
      {
        andWhereArgs: {
          ...prefixTableName(this.tableName, andWhereArgs),
          user_id: userId
        },
        orWhereArgs: prefixTableName(this.tableName, orWhereArgs)
      },
      paramVal
    );

    const text = `
      ${update.text}
      WHERE id = (
        ${select.text}
          ${joinStatement}
        ${where.text}
        ORDER BY id LIMIT 1
      )
      RETURNING *;
    `;
    const values = [update.values!, where.values!].flat();

    const {
      rows: [row]
    }: { rows: T[] } = await db.query({ text, values });
    return row;
  }

  protected static async baseDeleteOne<T>(id: number): Promise<T> {
    const deleteTxt = `DELETE FROM ${this.tableName}`;
    const where = addWhere({ andWhereArgs: { id }, orWhereArgs: {} });

    const text = `${deleteTxt} ${where.text} RETURNING *;`;
    const { values } = where;

    const {
      rows: [row]
    }: { rows: T[] } = await db.query({ text, values });
    return row;
  }

  protected static async baseDeleteOneByUserId<T>(
    id: number,
    joinUserIdArgs: JoinUserIdArgs<T>
  ): Promise<T> {
    const { userId, joinStatement } = joinUserIdArgs;

    // Select statement with id column is needed in the where clause
    // subquery (e.g., WHERE id = ...) so that only it only matches 1 id
    const select = addSelect(this.tableName, ['id']);

    const deleteTxt = `DELETE FROM ${this.tableName}`;

    // Make sure to prefix the whereArgs with the table name so "id" is not ambiguous
    // between the different tables
    const where = addWhere({
      andWhereArgs: {
        ...prefixTableName(this.tableName, { id }),
        user_id: userId
      },
      orWhereArgs: {}
    });

    const text = `
      ${deleteTxt}
      WHERE id = (
        ${select.text}
          ${joinStatement}
        ${where.text}
        ORDER BY id LIMIT 1
      )
      RETURNING *;
    `;
    const { values } = where;

    const {
      rows: [row]
    }: { rows: T[] } = await db.query({ text, values });
    return row;
  }
}
