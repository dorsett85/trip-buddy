import { QueryConfig } from 'pg';
import db from '../db/db';
import { addWhere } from '../utils/dbHelpers';
import { UserRecord } from './User.types';

export default class UserModel {
  public static async findOne(
    andWhereArgs: Partial<UserRecord> = {},
    orWhereArgs: Partial<UserRecord> = {}
  ): Promise<UserRecord> {
    const [row] = await UserModel.findMany(andWhereArgs, orWhereArgs);
    return row;
  }

  public static async findMany(
    andWhereArgs: Partial<UserRecord> = {},
    orWhereArgs: Partial<UserRecord> = {}
  ): Promise<UserRecord[]> {
    const text = `select * from users ${addWhere({ andWhereArgs, orWhereArgs })};`;
    const values = [...Object.values(andWhereArgs), ...Object.values(orWhereArgs)];

    const query: QueryConfig = { text, values };
    const { rows }: { rows: UserRecord[] } = await db.query(query);
    return rows;
  }
}
