interface OptionFlags {
  [key: string]: any;
}

export interface MigrationFlags {
  create: string;
  up: boolean;
  down: boolean;
  all: boolean;
}

export type AllFlags = MigrationFlags;
