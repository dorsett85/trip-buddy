import { Pool, QueryResult } from 'pg';

/**
 * Migration to run that must resolve to a pg QueryResult
 */
export const up = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    ALTER TABLE users
    ADD COLUMN accepting_trip_invites varchar DEFAULT 'no' NOT NULL CHECK (accepting_trip_invites in ('no', 'friends', 'all'));
  `);
};

/**
 * Migration to rollback that must resolve to a pg QueryResult
 */
export const down = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    ALTER TABLE users
    DROP COLUMN accepting_trip_invites;
  `);
};
