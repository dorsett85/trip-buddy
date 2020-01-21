import { GeneralState } from './general/types';
import { UserState } from './user/types';
import { TripState } from './trip/types';

export interface AppState {
  general: GeneralState;
  user: UserState;
  trip: TripState;
}
