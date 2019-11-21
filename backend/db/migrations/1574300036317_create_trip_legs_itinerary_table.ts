import { Pool, QueryResult } from 'pg';

/**
 * Migration to run that must resolve to a pg QueryResult
 */
export const up = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    CREATE TABLE trip_legs_itinerary (
      id serial PRIMARY KEY,
      trip_leg_id integer NOT NULL REFERENCES trip_legs(id) ON DELETE CASCADE,
      description varchar NOT NULL,
      start_time timestamp NOT NULL,
      end_time timestamp,
      created_date timestamp DEFAULT NOW() NOT NULL
    );
  `);
};

/**
 * Migration to rollback that must resolve to a pg QueryResult
 */
export const down = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    DROP TABLE IF EXISTS trip_legs_itinerary;
  `);
};
