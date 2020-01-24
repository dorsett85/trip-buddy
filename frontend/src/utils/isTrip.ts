import { TripRecord } from "common/lib/types/trip";

/**
 * Check if an object is a trip
 */
export const isTrip = (obj: any): obj is TripRecord =>
  'id' in obj && 'status' in obj && 'start_date' in obj;
