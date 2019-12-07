import { Pool, QueryResult } from 'pg';
import brcypt from 'bcrypt';

/**
 * Seed to run that must resolve to a pg QueryResult
 */
export const seed = async (pool: Pool): Promise<QueryResult<any>> =>
  pool.query(`
    INSERT INTO users (username, password, email, role)
    values (
      'clayton',
      '${brcypt.hashSync('password123', 10)}',
      'claytonphillipsdorsett@gmail.com',
      'admin'
    );
  `);
