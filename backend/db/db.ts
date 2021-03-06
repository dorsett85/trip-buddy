import { Pool } from 'pg';
import db from './pgFile';

// node-postgres connection for database service
const { connectionString } = db.connection;
export default new Pool({ connectionString });
