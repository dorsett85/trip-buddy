/* eslint-disable camelcase */
export interface TripRecord {
  id: number;
  name: string;
  start_location: [number, number];
  start_date: Date;
  end_date: Date;
  created_date: Date;
}
