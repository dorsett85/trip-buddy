import { Pool, QueryResult } from 'pg';

/**
 * Migration to run that must resolve to a pg QueryResult
 */
export const up = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    CREATE TABLE users_trips (
      id serial PRIMARY KEY,
      user_id integer REFERENCES users(id),
      trip_id integer REFERENCES trips(id),
      created timestamp DEFAULT NOW() NOT NULL
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
