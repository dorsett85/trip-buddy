import { PoolConfig } from 'pg';

export interface ExpressConfig {
  port: number;
  jwtSecretKey: string;
}

export interface PgConfig {
  connection: PoolConfig,
  migrations: {
    path: string
  },
  seeds: {
    path: string
  },
  dirName?: string
}
