import db from '../db/db';
import { addInsert, addWhere, addSelect, addUpdate } from '../utils/dbHelpers';
import { KeyValue } from '../types';

export default class BaseModel {
  public static tableName: string;

  public static async baseCreateOne(record: KeyValue): Promise<any> {
    const query = addInsert(this.tableName, record);
    const {
      rows: [row]
    }: { rows: KeyValue[] } = await db.query(query);

    return row;
  }

  public static async baseFindOne(
    andWhereArgs: KeyValue = {},
    orWhereArgs: KeyValue = {}
  ): Promise<any> {
    const [row] = await this.baseFindMany(andWhereArgs, orWhereArgs);
    return row;
  }

  public static async baseFindMany(
    andWhereArgs: KeyValue = {},
    orWhereArgs: KeyValue = {}
  ): Promise<any[]> {
    const select = addSelect(this.tableName);
    const where = addWhere({ andWhereArgs, orWhereArgs });
    const text = `${select.text} ${where.text};`;
    const { values } = where;

    const { rows }: { rows: KeyValue[] } = await db.query({ text, values });
    return rows;
  }

  public static async baseUpdateOne(
    updateArgs: KeyValue = {},
    andWhereArgs: KeyValue = {},
    orWhereArgs: KeyValue = {}
  ): Promise<any> {
    let paramVal = 1;

    // Select statement is needed in the where clause subquery that returns only 1 id
    const select = addSelect(this.tableName, ['id']);

    const update = addUpdate(this.tableName, updateArgs, paramVal);
    paramVal += update.values!.length;
    const where = addWhere({ andWhereArgs, orWhereArgs }, paramVal);

    const text = `${update.text} WHERE id = (${select.text} ${where.text} ORDER BY id LIMIT 1) RETURNING *;`;
    const values = [update.values!, where.values!].flat();

    const {
      rows: [row]
    }: { rows: KeyValue[] } = await db.query({ text, values });
    return row;
  }
}
