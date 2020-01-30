/*
 * Shared project types
 *
 * User this file to export shared types for the project, feel free
 * to define types in separate files in this directory
 */

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
 * An object containing properties that have key (column name) / value (column value)
 * pairs.  The T argument will specify the type of keys that are allowed (usually a
 * record type, e.g., a parial TripRecord)
 */
export interface WhereArgs<T = KeyValue> {
  andWhereArgs: T;
  orWhereArgs: T;
}

/**
 * Add a userId property to WhereArgs with a given type T
 */
export interface WhereWithUserIdArgs<T = KeyValue> extends WhereArgs<T> {
  userId: number;
}

/**
 * Include userId and joinStatement properties to go with WhereArgs.  This is
 * used for SQL queries that require filtering by a user id, so we can make sure
 * users are unable to query/modify other users data.
 */
export interface JoinUserIdArgs<T = KeyValue> extends WhereWithUserIdArgs<T> {
  /**
   * SQL statement to join a table that contains a user_id column,
   * e.g., users_trips
   */
  joinStatement: string;
}
