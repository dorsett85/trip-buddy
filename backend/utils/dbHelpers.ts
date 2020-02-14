import { QueryConfig, QueryResult } from 'pg';
import { isEmptyObject } from './isEmptyObject';
import { KeyValue, WhereArgs } from '../types';

export type LogicalOperator = 'AND' | 'OR';
export type ComparisonOperator = '=' | '>' | '<' | '>=' | '<=' | '!=';

export interface WhereArgsWithOptionalUserId extends WhereArgs {
  userId?: number;
}

/**
 * Add table name prefix
 *
 * Given an object of properties that contains key (column name) / value (column values)
 * pairs, an array of strings (column names), or a string (column name), return a new
 * object/array/string with prefixed table name.
 */
export function prefixTableName(table: string, column: string): string;
export function prefixTableName(table: string, columns: string[]): string[];
export function prefixTableName(table: string, arg: KeyValue): KeyValue;
export function prefixTableName(table: string, arg: KeyValue | string[] | string) {
  // Prefix for string argument
  if (typeof arg === 'string') {
    return `${table}.${arg}`;
  }

  // Prefix for array argument
  if (Array.isArray(arg)) {
    return arg.map(column => `${table}.${column}`);
  }

  // Prefix for objects argument
  const keysWithTablePrefix: KeyValue = {};
  return Object.keys(arg).reduce((acc, key) => {
    const obj = { ...acc };
    obj[`${table}.${key}`] = arg[key];
    return obj;
  }, keysWithTablePrefix);
}

/**
 * Add select clause text
 *
 * Given a table name and an array of column names, create an insert clause
 * text string.  If no column names are given, default to '*' (all columns)
 */
export const addSelect = (
  table: string,
  columns: string[] = []
): Pick<QueryConfig, 'text'> => {
  const columnWithTableName = prefixTableName(table, columns);
  const columnText = columns.length ? columnWithTableName.join(', ') : `${table}.*`;
  const text = `SELECT ${columnText} FROM ${table}`;

  return { text };
};

/**
 * Add insert clause text
 *
 * Given an object of key (column name) / value (column values) pairs, create
 * an insert clause text string
 */
export const addInsert = (
  table: string,
  insertArgs: KeyValue,
  paramVal = 1
): QueryConfig => {
  const values: string[] = [];
  let newParamVal = paramVal;

  // Loop through the insertArg entries to build the query and update variables
  const { insertText, valueText } = Object.entries(insertArgs).reduce(
    (acc, [key, value], idx, arr) => {
      const addOpenParan = idx === 0 ? '(' : '';
      const addCloseParan = idx === arr.length - 1 ? ')' : '';
      const addCommaAndSpace = idx === arr.length - 1 ? '' : ', ';
      acc.insertText += `${addOpenParan}${key}${addCommaAndSpace}${addCloseParan}`;
      acc.valueText += `${addOpenParan}$${newParamVal}${addCommaAndSpace}${addCloseParan}`;
      values.push(value);
      newParamVal += 1;
      return acc;
    },
    {
      insertText: '',
      valueText: 'VALUES '
    }
  );

  return {
    text: `INSERT INTO ${table} ${insertText} ${valueText} RETURNING *;`,
    values
  };
};

/**
 * Add update clause text
 *
 * Given an object of properties that contain key (column name) / value (column values) pairs,
 * create an update clause text string
 */
export const addUpdate = (
  table: string,
  updateArgs: KeyValue,
  paramVal = 1
): QueryConfig => {
  const values: string[] = [];
  let updateText = '';
  let newParamVal = paramVal;

  Object.entries(updateArgs).forEach(([key, value], idx, arr) => {
    const addCommaAndSpace = idx === arr.length - 1 ? '' : ', ';
    updateText += `${key} = $${newParamVal}${addCommaAndSpace}`;
    values.push(value);
    newParamVal += 1;
  });

  return {
    text: `UPDATE ${table} SET ${updateText}`,
    values
  };
};

/**
 * Add where clause text
 *
 * Given an object of properties that contain key (column name) / value (column values) pairs,
 * create a where clause text string
 */
export const addWhere = (
  table: string,
  { andWhereArgs = {}, orWhereArgs = {}, userId }: WhereArgsWithOptionalUserId,
  paramVal = 1
): QueryConfig => {
  let whereText = '';
  const values: any[] = [];
  let newParamVal = paramVal;

  // Check for empty arg objects
  const isAndEmpty = isEmptyObject(andWhereArgs);
  const isOrEmpty = isEmptyObject(orWhereArgs);
  if (isAndEmpty && isOrEmpty && !userId) {
    throw Error('No where arguments selected');
  }

  // Define function for adding to the query config variables
  const addtoQueryConfig = (args: object, operator: LogicalOperator) => {
    Object.entries(args).forEach(([key, value], idx, arr) => {
      const addOperator = idx === arr.length - 1 ? '' : ` ${operator} `;
      whereText += `${key} = $${newParamVal}${addOperator}`;
      values.push(value);
      newParamVal += 1;
    });
  };

  // Add the AND and OR where clauses if they exist
  if (!isAndEmpty) {
    addtoQueryConfig(prefixTableName(table, andWhereArgs), 'AND');
  }
  if (!isOrEmpty) {
    whereText += whereText.length ? ' OR ' : '';
    addtoQueryConfig(prefixTableName(table, orWhereArgs), 'OR');
  }

  // Add user_id if it's defined.  When there's no other arguments,
  // simply add it to the where text, otherwise wrap the where text
  // and add the user_id with an AND operator so it doesn't get overridden
  if (userId) {
    if (!whereText) {
      whereText = `user_id = $${newParamVal}`;
    } else {
      whereText = `(${whereText}) AND user_id = $${newParamVal}`;
    }
    values.push(userId);
  }

  return {
    text: `WHERE ${whereText}`,
    values
  };
};

/**
 * Extract rows from a QueryResult
 */
export const extractRows = <T>(result: QueryResult): T[] => {
  const { rows }: { rows: T[] } = result;
  return rows;
};

/**
 * Return a row from a QueryResult
 */
export const extractRow = <T>(result: QueryResult): T => {
  return extractRows<T>(result)[0];
};
