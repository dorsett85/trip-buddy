import { QueryConfig } from 'pg';
import db from '../db/db';
import { addWhere, addInsert } from '../utils/dbHelpers';
import { TripRecord } from './Trip.types';

export default class TripModel {
  public static async createOne(trip: Partial<TripRecord>): Promise<TripRecord> {
    const query = addInsert('trip', trip);
    const {
      rows: [row]
    }: { rows: TripRecord[] } = await db.query(query);
    return row;
  }

  public static async findOne(
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord | undefined> {
    const [row] = await TripModel.findMany(andWhereArgs, orWhereArgs);
    return row;
  }

  public static async findMany(
    andWhereArgs: Partial<TripRecord> = {},
    orWhereArgs: Partial<TripRecord> = {}
  ): Promise<TripRecord[]> {
    // eslint-disable-next-line prefer-const
    let { text, values } = addWhere({ andWhereArgs, orWhereArgs });
    text = `select * from trips ${text};`;

    const query: QueryConfig = { text, values };
    const { rows }: { rows: TripRecord[] } = await db.query(query);
    return rows;
  }
}
