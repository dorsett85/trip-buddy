import path from 'path';
import program from 'commander';
import { Pool } from 'pg';
import DbService from './DbService';
import { MigrationFlags, AllFlags, SeedFlags } from './types';
import { PgConfig } from '../../config/config.types';

const hasOpts = (opts: AllFlags) => Object.values(opts).some(Boolean);
const logInvalidFlags = () => console.log('No valid flags, use -h for options\n');
const outputResult = (result: string | void) => {
  console.log(result);
  console.log();
  process.exit();
};
const outputError = (err: Error) => {
  console.log(err.stack);
  process.exit();
};

// Create function to instantiate new db connection with the correct pgFile path
const getDb = (pgFile: string): DbService => {
  const configPath = path.join(process.cwd(), pgFile);
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
  return new DbService(pgConfig, db);
};

// General options
program.option('-p, --pg-file [path]', 'path to pgFile', 'pgFile.ts');

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
      const dbService = getDb(program.pgFile);
      dbService
        .migrateDispatch(opts)
        .then(outputResult)
        .catch(outputError);
    } else {
      logInvalidFlags();
    }
  });

// Seeds
program
  .command('seed')
  .description('seeding tools')
  .option('-c, --create <name>', 'create a seed')
  .option('-r, --run <name>', 'run a seed')
  .option('-a, --all', 'run all seeds')
  .action(cmd => {
    const opts: SeedFlags = {
      create: cmd.create,
      run: cmd.run,
      all: cmd.all
    };
    if (hasOpts(opts)) {
      const dbService = getDb(program.pgFile);
      dbService
        .seedDispatch(opts)
        .then(outputResult)
        .catch(outputError);
    } else {
      logInvalidFlags();
    }
  });

// Parse the arguments as a last call
program.parse(process.argv);
