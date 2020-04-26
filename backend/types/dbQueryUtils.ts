/**
 * A value for a given db table column. T is a passed in type
 * for the specific column's data type.
 */
export type RecordValue<T = any> = T;

/**
 * Used for a parameterized query. Here we don't know the values
 * for the RecordValue so we use its default (e.g., any).
 */
export type RecordValueArray = RecordValue[];

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
type WhereArgComparisonValue<T> = [ComparisonOperator, RecordValue<T>];

/**
 * A group of where arguments for where clause operations
 */
export interface WhereArgGroup<T = any> {
  /**
   * The key/value pairs or key/WhereArgComparisonValue object to make
   * where statements with
   */
  items: {
    [K in keyof T]: RecordValue<T[K]> | WhereArgComparisonValue<T[K]>;
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
