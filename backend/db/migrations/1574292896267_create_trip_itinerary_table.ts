import { Pool, QueryResult } from 'pg';

/**
 * Migration to run that must resolve to a pg QueryResult
 */
export const up = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    CREATE TABLE trip_itineraries (
      id serial PRIMARY KEY,
      trip_id integer NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
      name varchar NOT NULL,
      description varchar,
      location numeric[] NOT NULL CHECK (cardinality(location) = 2),
      start_time timestamp NOT NULL,
      end_time timestamp,
      created_date timestamp DEFAULT NOW() NOT NULL,
      UNIQUE(trip_id, name)
    );
  `);
};

/**
 * Migration to rollback that must resolve to a pg QueryResult
 */
export const down = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    DROP TABLE IF EXISTS trip_itineraries;
  `);
};
