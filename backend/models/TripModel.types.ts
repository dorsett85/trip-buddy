import { LngLatArray } from 'common/lib/types/utils';

export const tripStatus = [
  'pending',
  'confirmed',
  'active',
  'completed',
  'cancelled'
] as const;

/* eslint-disable camelcase */
export interface TripRecord {
  id: number;
  name: string;
  description?: string;
  location: LngLatArray;
  location_address: string;
  start_date: string;
  status: typeof tripStatus[number];
  created_date: string;
}

export type PartialTripRecord = Partial<TripRecord>;
