import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

/* eslint-disable camelcase */
export interface Trip {
  id?: number;
  name?: string;
  start_location?: [number, number];
  end_location?: [number, number];
  start_date?: MaterialUiPickersDate;
  end_date?: MaterialUiPickersDate;
  created_date?: Date;
}