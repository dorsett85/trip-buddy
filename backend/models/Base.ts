import db from '../db/db';
import { addInsert, addWhere, addSelect } from '../utils/dbHelpers';
import { KeyValue } from '../types';

export default class BaseModel {
  public static tableName: string;

  public static async baseCreateOne(record: KeyValue, table?: string): Promise<any> {
    const useTable = table || this.tableName;
    const query = addInsert(useTable, record);
    const {
      rows: [row]
    }: { rows: KeyValue[] } = await db.query(query);

    return row;
  }

  public static async baseFindOne(
    andWhereArgs: Partial<KeyValue> = {},
    orWhereArgs: Partial<KeyValue> = {}
  ): Promise<any> {
    const [row] = await this.baseFindMany(andWhereArgs, orWhereArgs);
    return row;
  }

  public static async baseFindMany(
    andWhereArgs: Partial<KeyValue> = {},
    orWhereArgs: Partial<KeyValue> = {}
  ): Promise<any[]> {
    const select = addSelect(this.tableName);
    const where = addWhere({ andWhereArgs, orWhereArgs });
    const text = `${select.text} ${where.text};`;
    const { values } = where;

    const { rows }: { rows: KeyValue[] } = await db.query({ text, values });
    return rows;
  }
}
