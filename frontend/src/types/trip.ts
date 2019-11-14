import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { LngLatArray } from './shared';

/* eslint-disable camelcase */
export interface Trip {
  id: number;
  name: string;
  start_location: LngLatArray;
  start_date: MaterialUiPickersDate;
  end_date: MaterialUiPickersDate;
  created_date: Date;
}
