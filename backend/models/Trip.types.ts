import { LngLatArray } from "../types";

/* eslint-disable camelcase */
export const tripStatus = [
  'pending',
  'confirmed',
  'active',
  'completed',
  'cancelled'
] as const;

export interface TripRecord {
  id: number;
  name: string;
  description: string;
  location: LngLatArray,
  start_date: string,
  status: typeof tripStatus[number];
  created_date: string;
}
