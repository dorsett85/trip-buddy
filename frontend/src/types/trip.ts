import { LngLatArray } from './shared';

export const tripStatus = [
  'pending',
  'confirmed',
  'active',
  'completed',
  'cancelled'
] as const;

/* eslint-disable camelcase */
export interface Trip {
  id: number;
  name: string;
  description?: string;
  location: LngLatArray;
  start_date: string;
  status: typeof tripStatus[number];
  created_date: string;
  itineraries: TripItinerary[];
}

export interface TripItinerary {
  id: number;
  trip_id: number;
  name: string;
  description?: string;
  location: LngLatArray;
  start_time: string;
  end_time?: string;
  created_date: string;
}
