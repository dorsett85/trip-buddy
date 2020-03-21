/*
 * Shared project types
 *
 * User this file to export shared types for the project, feel free
 * to define types in separate files in this directory
 */

import { LngLatArray } from 'common/lib/types/utils';

export interface KeyValue<T = any> {
  [key: string]: T;
}

/**
 * Change the return type of function types
 */
export type ChangeReturnType<TFunction, TReturn> = TFunction extends (
  ...a: infer A
) => any
  ? (...a: A) => TReturn
  : never;

/**
 * Remove the id property from a type. Used for update argument objects where
 * we never want to update the id column, so we make sure id prop is omitted.
 */
export type OmitId<T> = Omit<T, 'id'>;

/**
 * Remove the created_date property from a type. Used for update argument objects
 * where we never want to update the created_date column, so we make sure created_date
 * prop is omitted.
 */
export type OmitCreatedDate<T> = Omit<T, 'created_date'>;

/**
 * Omit both id and created_date properties
 */
export type OmitIdCreatedDate<T> = OmitId<T> & OmitCreatedDate<T>;

/**
 * All possible db value types
 */
export type RecordValues = string | number | boolean | Date | LngLatArray | undefined;

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
   * The logical operator that seperates the key/value item statements. E.g., the
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
