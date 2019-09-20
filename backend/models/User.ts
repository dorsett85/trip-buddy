import db from '../db/db';

export default class UserModel {
  public static async findOne(args: any) {
    const [row] = await UserModel.findMany(args);
    return row;
  }

  public static async findMany(args: any) {
    const { rows } = await db.query('select * from users');
    return rows;
  }
}