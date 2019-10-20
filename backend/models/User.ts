import { QueryConfig } from 'pg';
import db from '../db/db';
import { addWhere, addInsert } from '../utils/dbHelpers';
import { UserRecord } from './User.types';

export default class UserModel {
  public static async createOne(user: Partial<UserRecord>): Promise<UserRecord> {
    const query = addInsert('users', user);
    const {
      rows: [row]
    }: { rows: UserRecord[] } = await db.query(query);
    return row;
  }

  public static async findOne(
    andWhereArgs: Partial<UserRecord> = {},
    orWhereArgs: Partial<UserRecord> = {}
  ): Promise<UserRecord | undefined> {
    const [row] = await UserModel.findMany(andWhereArgs, orWhereArgs);
    return row;
  }

  public static async findMany(
    andWhereArgs: Partial<UserRecord> = {},
    orWhereArgs: Partial<UserRecord> = {}
  ): Promise<UserRecord[]> {
    // eslint-disable-next-line prefer-const
    let { text, values } = addWhere({ andWhereArgs, orWhereArgs });
    text = `select * from users ${text};`;

    const query: QueryConfig = { text, values };
    const { rows }: { rows: UserRecord[] } = await db.query(query);
    return rows;
  }
}
