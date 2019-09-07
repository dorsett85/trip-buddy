import path from 'path';
import program from 'commander';
import { Pool } from 'pg';
import DbService from './DbService';
import { MigrationFlags, AllFlags } from './types';
import { PgConfig } from '../../config/config.types';

const hasOpts = (opts: AllFlags) => Object.values(opts).some(Boolean);
const logInvalidFlags = () => console.log('No valid flags, use -h for options\n');

// General options
program.option('-p, --pg-file [path]', 'path to pgFile', 'pgFile.ts');
program.parse(process.argv);

// Define the pg config object and db connection
const configPath = path.join(process.cwd(), program.pgFile);
let pgConfig: PgConfig;
let db: Pool;
try {
  // eslint-disable-next-line global-require
  pgConfig = require(configPath).default;
  pgConfig.dirName = path.dirname(configPath);
  const { connectionString } = pgConfig.connection;
  db = new Pool({ connectionString });
} catch (err) {
  if (err.code === 'MODULE_NOT_FOUND') {
    throw Error(`Can't find pg config file at ${configPath}`);
  } else if (err instanceof TypeError) {
    throw Error('Check that your pg config file is correctly defined');
  }
  throw err;
}

// Instantiate db service before running commands
const dbService: DbService = new DbService(pgConfig, db);

// Migrations
program
  .command('migrate')
  .description('migration handling tools')
  .option('-c, --create <name>', 'create a migration')
  .option('-u, --up', 'run latest migration')
  .option('-d, --down', 'rollback last migration')
  .option('-a, --all', 'run or rollback all migrations')
  .action(cmd => {
    const opts: MigrationFlags = {
      create: cmd.create,
      up: cmd.up,
      down: cmd.down,
      all: cmd.all
    };
    if (hasOpts(opts)) {
      dbService.migrateDispatch(opts).then((result: string | void) => {
        console.log(result);
        console.log();
      });
    } else {
      logInvalidFlags();
    }
  });

// Parse the arguments again to work with commands
program.parse(process.argv);
