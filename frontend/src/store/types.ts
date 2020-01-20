import { ReducersMapObject } from 'redux';
import { GeneralState, GeneralAction, GeneralReducer } from './general/types';
import { UserState, UserAction, UserReducer } from './user/types';
import { TripState, TripAction, TripReducer } from './trip/types';

export interface AppState {
  general: GeneralState;
  user: UserState;
  trip: TripState;
}

export type AppAction = GeneralAction | UserAction | TripAction;

export interface AppReducers extends ReducersMapObject<AppState> {
  general: GeneralReducer;
  user: UserReducer;
  trip: TripReducer;
}