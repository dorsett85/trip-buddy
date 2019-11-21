import { LngLatArray } from "../types";

/* eslint-disable camelcase */
export interface TripLegRecord {
  id: number;
  trip_id: number;
  name: string;
  description: string;
  location: LngLatArray;
  date_time: Date;
  created_date: Date;
}
