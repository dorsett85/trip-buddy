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
