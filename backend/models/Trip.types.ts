/* eslint-disable camelcase */
export interface TripRecord {
  id: number;
  name: string;
  start_location: [number];
  end_location: [number];
  start_date: Date;
  end_date: Date;
  created: Date;
}

export interface UsersTripsRecord {
  user_id: number;
  trip_id: number;
}
