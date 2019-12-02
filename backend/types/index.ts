/*
 * Shared project types
 *
 * User this file to export shared types for the project, feel free
 * to define types in separate files in this directory
 */

export interface KeyValue<T = any> {
  [key: string]: T;
}

export type LngLatArray = [number, number];

export interface LngLatObj {
  x: number;
  y: number;
}

// Shortcut type to omit specific properties that we want to protect
export type OmitProtected<T, TOmit = unknown> = Omit<T, 'id' | 'created_date' | TOmit>;

// Change the return type of function types
export type ChangeReturnType<TFunction, TReturn> = TFunction extends (
  ...a: infer A
) => any
  ? (...a: A) => TReturn
  : never;
