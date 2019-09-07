import { ENV, JWT_SECRET_KEY, DB_CONNECTION } from '../../.env.json';
import { ExpressConfig, PgConfig } from './config.types';

// Define the process NODE_ENV env var to work with Express defaults
process.env.NODE_ENV = ENV;

export const env: string = ENV;

export const expressServer: ExpressConfig = {
  port: 3000,
  jwtSecretKey: JWT_SECRET_KEY
};

export const db: PgConfig = {
  connection: {
    connectionString: DB_CONNECTION
  },
  migrations: {
    path: 'migrations'
  },
  seeds: {
    path: 'seeds'
  }
};
