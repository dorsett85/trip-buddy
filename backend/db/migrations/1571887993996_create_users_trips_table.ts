import { Pool, QueryResult } from 'pg';

/**
 * Migration to run that must resolve to a pg QueryResult
 */
export const up = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    CREATE TABLE users_trips (
      id serial PRIMARY KEY,
      user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      trip_id integer NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
      created_date timestamp DEFAULT NOW() NOT NULL
    );
  `);
};

/**
 * Migration to rollback that must resolve to a pg QueryResult
 */
export const down = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    DROP TABLE IF EXISTS users_trips;
  `);
};
