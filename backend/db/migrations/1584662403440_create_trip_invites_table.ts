import { Pool, QueryResult } from 'pg';

/**
 * Migration to run that must resolve to a pg QueryResult
 */
export const up = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    CREATE TABLE trip_invites (
      id serial primary key,
      trip_id integer NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
      inviter_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      -- invitee_id can be null in case a user is invited that isn't registered yet
      invitee_id integer,
      invitee_email varchar NOT NULL,
      status varchar DEFAULT 'initiated' NOT NULL CHECK (status in ('initiated', 'notified', 'accepted', 'declined')),
      created_date timestamp DEFAULT NOW() NOT NULL,
      CONSTRAINT trip_invites_unique UNIQUE (trip_id, invitee_email)
    );
  `);
};

/**
 * Migration to rollback that must resolve to a pg QueryResult
 */
export const down = async (pool: Pool): Promise<QueryResult<any>> => {
  return pool.query(`
    DROP TABLE IF EXISTS trip_invites;
  `);
};
