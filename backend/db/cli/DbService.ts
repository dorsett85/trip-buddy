import path from 'path';
import { mkdirSync, copyFileSync, readdirSync } from 'fs';
import { Pool } from 'pg';
import { MigrationFlags } from './types';
import { PgConfig } from '../../config/config.types';

export default class DbService {
  private pgConfig: PgConfig;

  private db: Pool;

  constructor(pgConfig: PgConfig, db: Pool) {
    this.pgConfig = pgConfig;
    this.db = db;
  }

  private getDir(name: 'migrations' | 'seeds') {
    const configDir = this.pgConfig.dirName as string;
    const relativeDir = this.pgConfig[name].path || name;
    return path.resolve(configDir, relativeDir);
  }

  public async migrateDispatch(opts: MigrationFlags) {
    const { create, up, down, all } = opts;
    return create
      ? this.migrateCreate(create)
      : up
      ? this.migrateUp(all)
      : down
      ? this.migrateDown(all)
      : '';
  }

  private async migrateCreate(name: string): Promise<string> {
    const dir = this.getDir('migrations');

    // Create migrations directory if it doesn't exist
    try {
      await mkdirSync(dir, { recursive: true });
    } catch (err) {
      // No op if the directory already exists
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }

    // Create new migration file
    const migrationName = `${Date.now()}_${name}.ts`;
    const src = path.resolve(__dirname, 'migrationTemplate.ts');
    const dest = path.join(dir, migrationName);
    await copyFileSync(src, dest);

    return `Created migration ${name}`;
  }

  private async migrateUp(all: boolean) {
    const dir = this.getDir('migrations');
    const files = readdirSync(dir);
    let successString = '';
    files.forEach(file => {
      const migrationPath = path.join(dir, file);
      // eslint-disable-next-line global-require
      const { up } = require(migrationPath);
      Promise.resolve(up(this.db)).then(() => {
        successString += `Successfully migrated ${file}\n`;
      });
    });
    return successString;
  }

  private async migrateDown(all: boolean) {}
}
