import { isEmptyObject } from './isEmptyObject';
import { AllDbFields } from '../types/DbTypes';

type Operator = 'AND' | 'OR';

interface WhereArgs {
  andWhereArgs?: AllDbFields;
  orWhereArgs?: AllDbFields;
}

/**
 * Function to create partial parameterized query
 *
 * Given an args object, loop over the keys (column names) so that they equal a
 * parameter value (e.g., $1).  This helps in building dynamic parameterized queries
 * used for node postgres (pg)
 */
export const columnEqualsParam = (
  args: AllDbFields,
  operator: Operator,
  startingParamVal = 1
) => {
  return Object.keys(args)
    .map((key: string, idx) => `${key} = $${idx + startingParamVal}`)
    .join(` ${operator} `);
};

export const addWhere = ({ andWhereArgs, orWhereArgs }: WhereArgs): string => {
  let whereClause = '';

  // Add the AND and OR where clauses if they exist
  if (andWhereArgs && !isEmptyObject(andWhereArgs)) {
    whereClause += columnEqualsParam(andWhereArgs, 'AND');
  }
  if (orWhereArgs && !isEmptyObject(orWhereArgs)) {
    const addSpace = whereClause.length ? ' OR ' : '';
    const startingParamVal =
      andWhereArgs && Object.keys(andWhereArgs).length
        ? Object.keys(andWhereArgs).length + 1
        : 1;
    whereClause += `${addSpace}${columnEqualsParam(orWhereArgs, 'OR', startingParamVal)}`;
  }

  return whereClause && `WHERE ${whereClause}`;
};
