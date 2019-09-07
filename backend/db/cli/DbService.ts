/* eslint-disable no-await-in-loop */
import path from 'path';
import { mkdirSync, copyFileSync, readdirSync, existsSync } from 'fs';
import { Pool } from 'pg';
import { MigrationFlags, SubDir, SeedFlags } from './types';
import { PgConfig } from '../../config/config.types';

export default class DbService {
  private pgConfig: PgConfig;

  private db: Pool;

  constructor(pgConfig: PgConfig, db: Pool) {
    this.pgConfig = pgConfig;
    this.db = db;
  }

  private static makeDir(dir: string) {
    try {
      mkdirSync(dir, { recursive: true });
    } catch (err) {
      // No op if the directory already exists
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }
  }

  private getDir(name: SubDir) {
    const configDir = this.pgConfig.dirName as string;
    const optObj = this.pgConfig[name];
    const relativeDir = (optObj && optObj.path) || name;
    const newDir = path.resolve(configDir, relativeDir);

    // Make the directory if it doesn't exist
    DbService.makeDir(newDir);
    return newDir;
  }

  public async seedDispatch(opts: SeedFlags) {
    const { create, run, all } = opts;
    return create ? this.seedCreate(create) : this.seed({ run, all });
  }

  private seedCreate(name: string): string {
    const dir = this.getDir(SubDir.seeds);

    // Create new seed file
    const seedName = `${name}.ts`;
    const src = path.resolve(__dirname, 'seedTemplate.ts');
    const dest = path.join(dir, seedName);
    if (existsSync(dest)) {
      return `${dest} already exists!`;
    }
    copyFileSync(src, dest);

    return `Created seed ${name}`;
  }

  private async seed(opts: Partial<SeedFlags>): Promise<string> {
    const dir = this.getDir(SubDir.seeds);
    const files = readdirSync(dir).filter((file: string) =>
      opts.all ? file : file === opts.run
    );
    if (opts.run && !opts.all && !files[0]) {
      const seedPath = path.join(dir, opts.run);
      return `${seedPath} does not exist!`;
    }
    const successArr: Array<string> = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const migrationPath = path.join(dir, file);
      // eslint-disable-next-line global-require
      const { seed } = require(migrationPath);
      await seed(this.db);
      successArr.push(`Successfully seeded ${file}`);
    }

    return successArr.length ? successArr.join('\n') : 'Nothing to seed!';
  }

  public async migrateDispatch(opts: MigrationFlags) {
    const { create, up, down, all } = opts;
    return create
      ? this.migrateCreate(create)
      : up || down
      ? this.migrate({ up, down, all })
      : `-a flag must be used with -u or -d`;
  }

  private migrateCreate(name: string): string {
    const dir = this.getDir(SubDir.migrations);

    // Create new migration file
    const migrationName = `${Date.now()}_${name}.ts`;
    const src = path.resolve(__dirname, 'migrationTemplate.ts');
    const dest = path.join(dir, migrationName);
    copyFileSync(src, dest);

    return `Created migration ${name}`;
  }

  private async migrate(opts: Partial<MigrationFlags>): Promise<string> {
    // check if migration table exists
    const migrationTable = await this.buildMigrationTable();

    // Get migration names from the db
    // ** if --all flag is not set, only get the last migration
    const last = !opts.all ? 'ORDER BY id DESC LIMIT 1' : '';
    const { rows } = await this.db.query(`SELECT name from ${migrationTable} ${last}`);
    const migrationNames: Array<string> = rows.map((row: any) => row.name);

    // Get list of migration files to run or rollback
    const dir = this.getDir(SubDir.migrations);
    const files = readdirSync(dir);
    const successArr: Array<string> = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      // Logic cases to run or rollback the migration file
      const run: boolean = opts.all
        ? opts.up
          ? !migrationNames.includes(file) // ALL UP: run anything not in the table
          : migrationNames.includes(file) // ALL DOWN: rollback everything in the table
        : opts.up
        ? !migrationNames[0] || file > migrationNames[0] // UP: run newer than the last or if there's nothing
        : file === migrationNames[0]; // DOWN: rollback the last migration;

      if (run) {
        const migrationPath = path.join(dir, file);
        // eslint-disable-next-line global-require
        const migrationType = require(migrationPath);
        if (opts.up) {
          await migrationType.up(this.db);
          await this.db.query(
            `
            INSERT INTO ${migrationTable} (name, path)
            VALUES ($1, $2)
          `,
            [file, migrationPath]
          );
        } else {
          await migrationType.down(this.db);
          await this.db.query(
            `
            DELETE FROM ${migrationTable}
            WHERE name = $1
          `,
            [file]
          );
        }
        const migrationText: string = opts.up ? 'ran' : 'rolled back';
        successArr.push(`Successfully ${migrationText} migration ${file}`);

        // Only run once if --all flag isn't set
        if (!opts.all) {
          break;
        }
      }
    }
    const successText = opts.up ? 'Migrations' : 'Rollbacks';
    return successArr.length ? successArr.join('\n') : `${successText} are up-to date!`;
  }

  private async buildMigrationTable(): Promise<string> {
    const { migrations } = this.pgConfig;
    const migrationTable = (migrations && migrations.table) || 'pg_migrations';
    await this.db.query(`
      CREATE TABLE IF NOT EXISTS ${migrationTable} (
        id serial PRIMARY KEY,
        name varchar NOT NULL UNIQUE,
        path varchar NOT NULL UNIQUE,
        created timestamp DEFAULT NOW() NOT NULL
      );
    `);
    return migrationTable;
  }
}
