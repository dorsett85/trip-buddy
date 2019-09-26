import { QueryConfig } from 'pg';
import db from '../db/db';
import { addWhere } from '../utils/dbHelpers';
import { UserFields } from './User.types';

export default class UserModel {
  public static async findOne(args: Partial<UserFields>) {
    const [row] = await UserModel.findMany(args);
    return row;
  }

  public static async findMany(
    andWhereArgs: Partial<UserFields> = {},
    orWhereArgs: Partial<UserFields> = {}
  ) {
    const text = `select * from users ${addWhere({ andWhereArgs, orWhereArgs })};`;
    const values = [...Object.values(andWhereArgs), ...Object.values(orWhereArgs)];

    const query: QueryConfig = { text, values };
    const { rows } = await db.query(query);
    return rows;
  }
}
