import { Trip } from '../api/apollo/graphql';

/**
 * Check if an object is a trip
 */
export const isTrip = (obj: any): obj is Trip =>
  'id' in obj && 'status' in obj && 'start_date' in obj;
