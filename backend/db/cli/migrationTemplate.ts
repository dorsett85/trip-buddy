import { Pool, QueryResult } from 'pg';

/**
 * Migration to run that must resolve to a pg QueryResult
 */
export const up = async (pool: Pool): Promise<QueryResult<any>> => (
  pool.query('')
);

/**
 * Migration to rollback that must resolve to a pg QueryResult
 */
export const down = async (pool: Pool): Promise<QueryResult<any>> => (
  pool.query('')
);
