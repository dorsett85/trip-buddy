import { ReducersMapObject } from 'redux';
import { GeneralState, GeneralAction } from './general/types';
import { UserState, UserAction } from './user/types';
import { TripState, TripAction } from './trip/types';

export interface AppState {
  general: GeneralState;
  user: UserState;
  trip: TripState;
}

export type AppAction = GeneralAction | UserAction | TripAction;

export type AppReducers = ReducersMapObject<AppState, AppAction>;