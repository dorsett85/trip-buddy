import { UserState } from './user/types';
import { TripState } from './trip/types';
import { GeneralState } from './general/types';

export interface AppState {
  general: GeneralState;
  user: UserState;
  trip: TripState;
}
