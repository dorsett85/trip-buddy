import { Command } from 'commander';
import db from '../db';
import knexConfig from '../knexfile';

interface OptionFlags {
  [key: string]: any
}

export default class DbService {
  static getCommandObj(cmdObj: any, cmdObj2: any): Command {
    return cmdObj instanceof Command ? cmdObj : cmdObj2;
  }

  static getOpts(cmdObj: Command): Boolean | OptionFlags {
    const opts = cmdObj.opts();
    return Object.values(opts).some(Boolean) && opts;
  }

  static getCommandObjAndOpts(cmdObj: any, cmdObj2: any) {
    const command = DbService.getCommandObj(cmdObj, cmdObj2);
    const opts = DbService.getOpts(command);
    return { command, opts };
  }

  static migrate(cmdObj: any, cmdObj2: any): void {
    const { command, opts } = DbService.getCommandObjAndOpts(cmdObj, cmdObj2);
    if (!opts) {
      return command.outputHelp();
    }
    return console.log(opts)
  }
}
