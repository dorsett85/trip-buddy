import { isEmptyObject } from './isEmptyObject';

type Operator = 'AND' | 'OR';

type Values = (string | number | boolean | null | undefined)[];

interface AddWhere {
  text: string;
  values: Values;
}

interface WhereArgs {
  andWhereArgs: {
    [key: string]: any;
  };
  orWhereArgs: {
    [key: string]: any;
  };
}

/**
 * Function to create partial parameterized query
 *
 * Given an array of column names, loop them so they equal a parameter
 * value (e.g., id = $1).  This helps in building dynamic parameterized
 * queries used for node postgres (pg)
 *
 * @example
 * // Outputs 'id = $1 AND username = $2'
 * columnEqualsParam(['id', 'username'], 'AND');
 */
export const columnEqualsParam = (
  colNames: string[],
  operator: Operator = 'AND',
  startingParamVal = 1
): string => {
  return colNames
    .map((colName: string, idx: number) => `${colName} = $${idx + startingParamVal}`)
    .join(` ${operator} `);
};

/*
 * WHERE helper functions
 */

export const addWhere = (
  { andWhereArgs = {}, orWhereArgs = {} }: WhereArgs,
  values: Values = [],
  paramVal = 1
): AddWhere => {
  let whereClause = '';
  let newParamVal = paramVal;
  let newValues = values.flat();

  // Add the AND and OR where clauses if they exist
  if (!isEmptyObject(andWhereArgs)) {
    const colNames = Object.keys(andWhereArgs);
    const colValues = Object.values(andWhereArgs);
    whereClause += columnEqualsParam(colNames, 'AND', newParamVal);
    newParamVal += colNames.length;
    newValues = newValues.concat(colValues);
  }
  if (!isEmptyObject(orWhereArgs)) {
    const colNames = Object.keys(orWhereArgs);
    const colValues = Object.values(orWhereArgs);
    whereClause += whereClause.length ? ' OR ' : '';
    whereClause += columnEqualsParam(colNames, 'OR', newParamVal);
    newParamVal += colNames.length;
    newValues = newValues.concat(colValues);
  }

  return {
    text: whereClause ? `WHERE ${whereClause}` : '',
    values: newValues
  };
};
