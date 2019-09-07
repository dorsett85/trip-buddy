interface OptionFlags {
  [key: string]: any;
}

export interface MigrationFlags {
  create: string;
  up: boolean;
  down: boolean;
  all: boolean;
}

export interface SeedFlags {
  create: string;
  run: string;
  all: boolean;
}

export enum SubDir {
  migrations = 'migrations',
  seeds = 'seeds'
}

export type AllFlags = MigrationFlags | SeedFlags;
