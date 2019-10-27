/*
 * Shared project types
 *
 * User this file to export shared types for the project, feel free
 * to define types in separate files in this directory
 */

export interface Example {
  hello: string;
  world: string;
}

export interface KeyValue<T = any> {
  [key: string]: T;
}
