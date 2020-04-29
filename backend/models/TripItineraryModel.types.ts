import { LngLatArray } from "./utils";

/* eslint-disable camelcase */
export interface TripItineraryRecord {
  id: number;
  trip_id: number;
  name: string;
  description?: string;
  location: LngLatArray;
  location_address: string;
  start_time: string;
  end_time?: string,
  created_date: string;
}

export type PartialTripItineraryRecord = Partial<TripItineraryRecord>;
