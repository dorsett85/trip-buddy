import { Config } from 'knex';
import { ENV, JWT_SECRET_KEY, DB_CONNECTION } from '../../.env.json';
import { ConfigType } from './config.types';

interface ExpressConfigType {
  port: number;
  jwtSecretKey: string;
}

// Define the process NODE_ENV env var to work with Express defaults
process.env.NODE_ENV = ENV;

export const env: string = ENV;

export const expressServer: ExpressConfigType = {
  port: 3000,
  jwtSecretKey: JWT_SECRET_KEY
};

export const db: Config = {
  client: 'pg',
  connection: DB_CONNECTION,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

export default {
  env,
  expressServer,
  db
} as ConfigType;
