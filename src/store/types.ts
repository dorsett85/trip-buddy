import { UserState, UserActionTypes } from './user/types';

export interface AppState {
  user: UserState
}

export type AppActionTypes = UserActionTypes;
