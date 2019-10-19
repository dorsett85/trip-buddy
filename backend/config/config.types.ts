import { PoolConfig } from 'pg';

export type Env = 'development' | 'testing' | 'production';

export interface ExpressConfig {
  port: number;
  jwtSecretKey: string;
}

export interface PgConfig {
  connection: PoolConfig,
  migrations?: {
    path?: string,
    table?: string
  },
  seeds?: {
    path: string
  },
  dirName?: string
}
