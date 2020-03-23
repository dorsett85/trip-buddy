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
 * Enclose a type with an object with an input property. This is used for resolver
 * args that have an input property to align with the graphql schema.
 */
export interface InputResolverArg<T> {
  input: T;
}