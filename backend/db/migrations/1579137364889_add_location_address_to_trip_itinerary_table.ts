import { Pool, QueryResult } from 'pg';

/**
 * Migration to run that must resolve to a pg QueryResult
 */
export const up = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    ALTER TABLE trip_itineraries
    ADD COLUMN location_address varchar DEFAULT '' NOT NULL;
  `);
};

/**
 * Migration to rollback that must resolve to a pg QueryResult
 */
export const down = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    ALTER TABLE trip_itineraries
    DROP COLUMN location_address;
  `);
};
