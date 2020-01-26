import { QueryConfig } from 'pg';
import { isEmptyObject } from './isEmptyObject';
import { KeyValue } from '../types';

type Operator = 'AND' | 'OR';

interface WhereArgs {
  andWhereArgs: KeyValue;
  orWhereArgs: KeyValue;
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
  const columnWithTableName: string[] = columns.map(column => `${table}.${column}`);
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
  { andWhereArgs = {}, orWhereArgs = {} }: WhereArgs,
  paramVal = 1
): QueryConfig => {
  let whereText = '';
  const values: string[] = [];
  let newParamVal = paramVal;

  // Check for empty arg objects
  const isAndEmpty = isEmptyObject(andWhereArgs);
  const isOrEmpty = isEmptyObject(orWhereArgs);
  if (isAndEmpty && isOrEmpty) {
    throw Error('andWhereArgs and orWhereArgs are both empty');
  }

  // Define function for adding to the query config variables
  const addtoQueryConfig = (args: object, operator: Operator) => {
    Object.entries(args).forEach(([key, value], idx, arr) => {
      const addOperator = idx === arr.length - 1 ? '' : ` ${operator} `;
      whereText += `${key} = $${newParamVal}${addOperator}`;
      values.push(value);
      newParamVal += 1;
    });
  };

  // Add the AND and OR where clauses if they exist
  if (!isAndEmpty) {
    addtoQueryConfig(andWhereArgs, 'AND');
  }
  if (!isOrEmpty) {
    whereText += whereText.length ? ' OR ' : '';
    addtoQueryConfig(orWhereArgs, 'OR');
  }

  return {
    text: whereText ? `WHERE ${whereText}` : '',
    values
  };
};

/**
 * Add table name prefix
 *
 * Given an object of properties that contain key (column name) / value (column values) pairs,
 * return a new object that has keys prefixed with a table name
 */
export const prefixTableName = (table: string, args: KeyValue): KeyValue => {
  const keysWithTablePrefix: KeyValue = {};
  return Object.keys(args).reduce((acc, key) => {
    const obj = { ...acc };
    obj[`${table}.${key}`] = args[key];
    return obj;
  }, keysWithTablePrefix);
}
