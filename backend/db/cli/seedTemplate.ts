import { Pool, QueryResult } from 'pg';

/**
 * Seed to run that must resolve to a pg QueryResult
 */
export const seed = async (pool: Pool): Promise<QueryResult<any>> => (
  pool.query('')
);
