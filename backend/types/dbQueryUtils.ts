import { LngLatArray } from 'common/lib/types/utils';
import { UserRecord } from 'common/lib/types/user';

/**
 * All possible db value types
 */
export type RecordValues =
  | string
  | number
  | boolean
  | Date
  | LngLatArray
  | undefined
  | Partial<UserRecord['new_user_setup']>;

/**
 * Array of record value types
 */
export type RecordValueArray = RecordValues[];

/**
 * Currently supported logical operators for db operations
 */
export type LogicalOperator = 'AND' | 'OR';

/**
 * Currently supported comparison operators for db operations
 */
export type ComparisonOperator = '=' | '>' | '<' | '>=' | '<=' | '!=';

/**
 * Array with a first argument being a Comparison operator and second being a
 * RecordValues type.  This is helpful for modifying the comparison operator
 * between key/value pairs during db operations.
 */
type WhereArgComparisonValue = [ComparisonOperator, RecordValues];

/**
 * A group of where arguments for where clause operations
 */
export interface WhereArgGroup<T = any> {
  /**
   * The key/value pairs or key/WhereArgComparisonValue object to make
   * where statements with
   */
  items: {
    [K in keyof T]: RecordValues | WhereArgComparisonValue;
  };
  /**
   * Whether or not to wrap the items key/value statement(s) in parentheses
   */
  wrap?: boolean;
  /**
   * Whether or not to prefix the item keys with a table name.  This is useful when
   * joining tables and you don't want the column names to be ambiguous.
   */
  prefixTableName?: string | false;
  /**
   * Type of logical operator to prefix before the key/value item statements. E.g.,
   * put 'AND' in front of "id = 1 AND username = 'clayton'".
   */
  prefixOperator?: LogicalOperator;
  /**
   * The logical operator that separates the key/value item statements. E.g., the
   * 'OR' in "id = 1 OR username = 'clayton'"
   */
  logicalOperator?: LogicalOperator;
}

export interface ParamQuery {
  text: string;
  values?: RecordValueArray;
}

export type WhereArgs<T = any> =
  | WhereArgGroup<T>
  | ParamQuery
  | (WhereArgGroup<T> | ParamQuery)[];
