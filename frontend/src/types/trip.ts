/* eslint-disable camelcase */
export interface Trip {
  id?: number;
  name?: string;
  start_location?: [number];
  end_location?: [number];
  start_date?: Date;
  end_date?: Date;
  created?: Date;
}