import { QueryResult } from 'pg';
import { RecordDict } from '../types';

/**
 * Add table name prefix
 *
 * Given an object of properties that contains key (column name) / value (column values)
 * pairs, an array of strings (column names), or a string (column name), return a new
 * object/array/string with prefixed table name.
 */
export function prefixTableName(table: string, column: string): string;
export function prefixTableName(table: string, columns: string[]): string[];
export function prefixTableName(table: string, arg: RecordDict): RecordDict;
export function prefixTableName(table: string, arg: RecordDict | string[] | string) {
  // Prefix for string argument
  if (typeof arg === 'string') {
    return `${table}.${arg}`;
  }

  // Prefix for array argument
  if (Array.isArray(arg)) {
    return arg.map(column => `${table}.${column}`);
  }

  // Prefix for objects argument
  const keysWithTablePrefix: RecordDict = {};
  return Object.keys(arg).reduce((acc, key) => {
    const obj = { ...acc };
    obj[`${table}.${key}`] = arg[key];
    return obj;
  }, keysWithTablePrefix);
}

/**
 * Extract rows from a QueryResult
 */
export const extractRows = <T>(result: QueryResult<T>): T[] => {
  const { rows }: { rows: T[] } = result;
  return rows;
};

/**
 * Extract row from a QueryResult
 */
export const extractRow = <T>(result: QueryResult<T>): T => extractRows(result)[0];