import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { LngLatArray } from './shared';

/* eslint-disable camelcase */
export interface Trip {
  id: number;
  name: string;
  description?: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  created_date: MaterialUiPickersDate;
  legs: TripLeg[];
}

export interface TripLeg {
  id: number;
  name: string;
  description?: string;
  location: LngLatArray;
  date_time: MaterialUiPickersDate;
  created_date: MaterialUiPickersDate;
  itinerary: TripLegItinerary[];
}

export interface TripLegItinerary {
  id: number;
  description?: string;
  start_time: MaterialUiPickersDate;
  end_time?: MaterialUiPickersDate;
}