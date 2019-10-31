import { UserState } from './user/types';
import { TripState } from './trip/types';

export interface AppState {
  user: UserState;
  trip: TripState;
}
