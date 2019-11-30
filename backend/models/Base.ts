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
    const update = addUpdate(this.tableName, updateArgs);
    const where = addWhere({ andWhereArgs, orWhereArgs }, update.values!.length + 1);
    const text = `${update.text} ${where.text} RETURNING *;`;
    const values = [...update.values!, ...where.values!];

    const { rows: [row] }: { rows: KeyValue[] } = await db.query({ text, values });
    return row;
  }
}
