import { Pool, QueryResult } from 'pg';

/**
 * Migration to run that must resolve to a pg QueryResult
 */
export const up = async (pool: Pool): Promise<QueryResult<any>> => (
  pool.query(`
    CREATE TABLE users (
      id serial PRIMARY KEY,
      username varchar NOT NULL UNIQUE,
      password varchar NOT NULL,
      email varchar NOT NULL,
      email_validated boolean DEFAULT false NOT NULL,
      created timestamp DEFAULT NOW() NOT NULL
    );
  `)
);

/**
 * Migration to rollback that must resolve to a pg QueryResult
 */
export const down = async (pool: Pool): Promise<QueryResult<any>> => (
  pool.query(`
    DROP TABLE IF EXISTS users;
  `)
);
