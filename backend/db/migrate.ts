import program from 'commander';
import db from './db';
import knexConfig from './knexfile';

// Define migration options
program
  .option('-m, --make', 'make a migration')
  .option('-u, --up', 'run next migration')
  .option('-d, --down', 'rollback last migration')
  .option('-l, --latest', 'migrate to latest')
  .option('-r, --rollback', 'rollback all migrations')

// Add error handling for 

program.parse(process.argv)
console.log(program.opts());