import { QueryConfig } from 'pg';
import { isEmptyObject } from './isEmptyObject';
import { KeyValue } from '../types';

type Operator = 'AND' | 'OR';

type Values = (string | number | boolean | null | undefined)[];

interface WhereArgs {
  andWhereArgs: KeyValue<any>;
  orWhereArgs: KeyValue<any>;
}

/**
 * Add insert clause text
 *
 * Given an object of key (column name) / value (column values) pairs, create
 * an insert clause text string
 */
export const addInsert = (
  table: string,
  insertArgs: KeyValue<any>,
  values: Values = [],
  paramVal = 1
): QueryConfig => {
  const newValues = [...values];
  let newParamVal = paramVal;

  // Loop through the insertArg entries to build the query and update variables
  const { insertText, valueText } = Object.entries(insertArgs).reduce(
    (acc, [key, value], idx, arr) => {
      const addOpenParan = idx === 0 ? '(' : '';
      const addCloseParan = idx === arr.length - 1 ? ')' : '';
      const addCommaAndSpace = idx === arr.length - 1 ? '' : ', ';
      acc.insertText += `${addOpenParan}${key}${addCommaAndSpace}${addCloseParan}`;
      acc.valueText += `${addOpenParan}$${newParamVal}${addCommaAndSpace}${addCloseParan}`;
      newValues.push(value);
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
    values: newValues
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
  values: Values = [],
  paramVal = 1
): QueryConfig => {
  let whereClause = '';
  const newValues = [...values];
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
      whereClause += `${key} = $${newParamVal}${addOperator}`;
      newValues.push(value);
      newParamVal += 1;
    });
  };

  // Add the AND and OR where clauses if they exist
  if (!isAndEmpty) {
    addtoQueryConfig(andWhereArgs, 'AND');
  }
  if (!isOrEmpty) {
    whereClause += whereClause.length ? ' OR ' : '';
    addtoQueryConfig(orWhereArgs, 'OR');
  }

  return {
    text: whereClause ? `WHERE ${whereClause}` : '',
    values: newValues
  };
};
