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
      : up && down
      ? 'Cannot use both -u and -d flags'
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
    const query = `SELECT name from ${migrationTable}`;
    const { rows } = await this.db.query(query);
    const migrationNames: Array<string> = rows.map((row: any) => row.name);

    // Get list of migration files to run or rollback
    const dir = this.getDir(SubDir.migrations);
    const files = opts.up ? readdirSync(dir) : readdirSync(dir).reverse();
    const successArr: Array<string> = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      // We only run the up migration if the it doesn't exist in the table and
      // only run the down migration if it does exist in the table
      const runUp = opts.up && !migrationNames.includes(file);
      const runDown = opts.down && migrationNames.includes(file);

      if (runUp || runDown) {
        const migrationPath = path.join(dir, file);
        // eslint-disable-next-line global-require
        const migration = require(migrationPath);
        let text;
        let values;
        if (opts.up) {
          await migration.up(this.db);
          text = `INSERT INTO ${migrationTable} (name, path) VALUES ($1, $2)`;
          values = [file, migrationPath];
        } else {
          await migration.down(this.db);
          text = `DELETE FROM ${migrationTable} WHERE name = $1`;
          values = [file];
        }
        await this.db.query({ text, values });

        const migrationText: string = opts.up ? 'ran' : 'rolled back';
        successArr.push(`Successfully ${migrationText} migration ${file}`);

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
