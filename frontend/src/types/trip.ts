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
  status: typeof tripStatus[number];
  created_date: string;
  legs: TripLeg[];
}

export interface TripLeg {
  id: number;
  name: string;
  description?: string;
  location: LngLatArray;
  date_time: string;
  created_date: string;
  itinerary: TripLegItinerary[];
}

export interface TripLegItinerary {
  id: number;
  description?: string;
  start_time: string;
  end_time?: string;
}
