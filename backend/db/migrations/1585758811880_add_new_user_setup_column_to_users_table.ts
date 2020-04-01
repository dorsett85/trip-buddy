import { Pool, QueryResult } from 'pg';

/**
 * Migration to run that must resolve to a pg QueryResult
 */
export const up = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    ALTER TABLE users
        ADD COLUMN new_user_setup jsonb default '{ "email_verified": false, "username": false, "accepting_trip_invites": false }' NOT NULL,
        ADD CONSTRAINT check_keys_exist CHECK (new_user_setup ?& array['email_verified','username','accepting_trip_invites']),
        ADD CONSTRAINT check_email_verified CHECK (jsonb_typeof(new_user_setup -> 'email_verified') = 'boolean'),
        ADD CONSTRAINT check_username CHECK (jsonb_typeof(new_user_setup -> 'username') = 'boolean'),
        ADD CONSTRAINT check_accepting_trip_invites CHECK (jsonb_typeof(new_user_setup -> 'accepting_trip_invites') = 'boolean')
  `);
};

/**
 * Migration to rollback that must resolve to a pg QueryResult
 */
export const down = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    ALTER TABLE users
    DROP COLUMN new_user_setup;
  `);
};
