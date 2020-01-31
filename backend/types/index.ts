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
 * Used for object arguments for methods that need to create SQL statements
 * that filter by user_id
 */
export interface UserIdArgs<T> {
  userId: T['id'];
}

/**
 * Used for object arguments that need to join a table that contains a user_id column.
 * This makes sure users are unable to query/modify other users data.
 */
export interface JoinArgs {
  /**
   * SQL statement to join a table (by column reference) that contains a user_id column.
   * This then allows the SQL query to be filtered by the value in the user_id column.
   * @example
   * `LEFT JOIN users_trips ut ON ut.trip_id = ${this.tableName}.id`
   */
  joinStatement: string;
}

/**
 * userId and joinStatement property type
 */
export type JoinUserIdArgs<T> = UserIdArgs<T> & JoinArgs;

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
export type WhereUserIdArgs<T = KeyValue> = WhereArgs<T> & UserIdArgs<T>;

/**
 * Include userId and joinStatement properties to go with WhereArgs.
 */
export type WhereJoinUserIdArgs<T = KeyValue> = UserIdArgs<T> & JoinArgs & WhereArgs<T>;
