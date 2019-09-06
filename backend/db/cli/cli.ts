import program from 'commander';
import DbService from './DbService';

const dbService = new DbService();

// Migrations
program
  .command('migrate')
  .description('migration handling tools')
  .option('-c, --create <name>', 'create a migration')
  .option('-u, --up', 'run latest migration')
  .option('-d, --down', 'rollback last migration')
  .option('-a, --all', 'run or rollback all migrations')
  .action(DbService.migrate)

// Parse the arguments as last call
program.parse(process.argv);
