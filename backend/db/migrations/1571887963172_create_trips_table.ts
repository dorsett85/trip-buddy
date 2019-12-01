import { Pool, QueryResult } from 'pg';

/**
 * Migration to run that must resolve to a pg QueryResult
 */
export const up = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    CREATE TABLE trips (
      id serial PRIMARY KEY,
      name varchar NOT NULL,
      description varchar,
      status varchar DEFAULT 'pending' NOT NULL CHECK (status in ('pending', 'confirmed', 'active', 'completed', 'cancelled')),
      created_date timestamp DEFAULT NOW() NOT NULL
    );
  `);
};

/**
 * Migration to rollback that must resolve to a pg QueryResult
 */
export const down = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    DROP TABLE IF EXISTS trips;
  `);
};
